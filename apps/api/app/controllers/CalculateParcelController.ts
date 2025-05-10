import { db } from "#config/database"
import type { HttpContext } from "@adonisjs/core/http"
import { eq, inArray } from "drizzle-orm"

import { carriers, categories, products as productsTable, taxes } from "#database/schema"
import { CalculateParcelTaxeValidator } from "#validators/CalculateParcelTaxeValidator"

// As of April 1, 2023, the “franchise threshold” was raised to 400 euros
const FRANCHISE_THRESHOLD_PRIVATE_CUSTOMER = 400
const FRANCHISE_THRESHOLD_CUSTOMER = 22

export default class CalculateParcelController {
  async handle({ request }: HttpContext) {
    const data = request.body()
    const payload = await CalculateParcelTaxeValidator.validate(data)

    const { customer, deliveryPrice, origin, products, transporter } = payload

    const allProductPrice = products.reduce((acc, product) => acc + product.price, 0)
    const privateCustomer = customer === "Non"
    const dutyPrice = allProductPrice + deliveryPrice

    const isTaxesApplicable = () => {
      const isTaxesForPrivateCustomerApplicable =
        dutyPrice > FRANCHISE_THRESHOLD_PRIVATE_CUSTOMER && !privateCustomer && origin === "EU"

      const isTaxesForCustomerApplicable =
        dutyPrice > FRANCHISE_THRESHOLD_CUSTOMER && privateCustomer && origin === "EU"

      return {
        applicable: isTaxesForPrivateCustomerApplicable || isTaxesForCustomerApplicable,
        privateCustomer: !privateCustomer,
      }
    }

    const carrier = await db
      .select({
        carrierPrice: carriers.managementFee,
      })
      .from(carriers)
      .where(eq(carriers.carrierName, transporter))

    // if (carrier.length === 0) {
    //   throw new Error("Transporter not found")
    // }

    const productNames = products.map((product) => product.name)
    const productResults = await db
      .select({
        categoryName: categories.categoryName,
        tva: taxes.tva,
        om: taxes.om,
        omr: taxes.omr,
      })
      .from(productsTable)
      .innerJoin(categories, eq(productsTable.category, categories.categoryID))
      .innerJoin(taxes, eq(categories.taxID, taxes.taxID))
      .where(inArray(productsTable.productName, productNames))

    // if (productResults.length === 0) {
    //   throw new Error("Products not found")
    // }

    const availableCategories = productResults.map((result) => ({
      categoryName: result.categoryName,
      tva: result.tva,
      om: result.om,
      omr: result.omr,
    }))

    const { tva, om, omr } = availableCategories[0]

    console.log(availableCategories[0])

    const omrPrice = Math.round((dutyPrice * omr) / 100)
    const omPrice = Math.round((dutyPrice * om) / 100)
    const tvaPrice = Math.round((dutyPrice * tva) / 100)

    const totalTaxes = omrPrice + omPrice + tvaPrice + carrier[0].carrierPrice

    const result = {
      carrierFee: carrier[0].carrierPrice,
      dutyPrice: dutyPrice,
      products: products,
      taxes: {
        tva: tva,
        om: om,
        omr: omr,
      },
      taxesInfo: isTaxesApplicable(),
      totalTaxes: totalTaxes,
    }

    return result
  }
}
