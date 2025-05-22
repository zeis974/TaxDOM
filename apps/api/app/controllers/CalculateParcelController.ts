import type { HttpContext } from "@adonisjs/core/http"
import type { ParcelSimulatorResult } from "@taxdom/types"
import { db } from "#config/database"
import { eq, inArray } from "drizzle-orm"

import { categories, products as productsTable, taxes } from "#database/schema"
import { CalculateParcelTaxeValidator } from "#validators/CalculateParcelTaxeValidator"

// As of April 1, 2023, the “franchise threshold” was raised to 400 euros
const FRANCHISE_THRESHOLD_BETWEEN_INDIVIDUALS = 400
const FRANCHISE_THRESHOLD_CUSTOMER = 22

// COLISSIMO
const COLISSIMO_CARRIER_FEE = 5

// CHRONOPOST
const CHRONOPOST_CARRIER_FEE_INF_1000 = 21
const CHRONOPOST_CARRIER_FEE_SUP_1000 = 29
const CHRONOPOST_CARRIER_FEE = 10

export default class CalculateParcelController {
  async handle({ request }: HttpContext) {
    const data = request.body()

    const payload = await CalculateParcelTaxeValidator.validate(data)

    const { customer, deliveryPrice, origin, products, transporter } = payload

    const totalProductPrice = products.reduce((acc, product) => acc + product.price, 0)
    const dutyPrice = totalProductPrice + deliveryPrice
    const isBetweenIndividuals = customer === "Oui"

    function getTaxApplicability({
      dutyPrice,
      isBetweenIndividuals,
      origin,
      transporter,
    }: {
      dutyPrice: number
      isBetweenIndividuals: boolean
      origin: string
      transporter: string
    }): "yes" | "no" | "maybe" {
      const fromEU = origin === "EU"

      const privateThresholdExceeded = dutyPrice > FRANCHISE_THRESHOLD_BETWEEN_INDIVIDUALS
      const customerThresholdExceeded = dutyPrice > FRANCHISE_THRESHOLD_CUSTOMER

      const isPrivateApplicable = fromEU && privateThresholdExceeded && !isBetweenIndividuals
      const isCustomerApplicable = fromEU && customerThresholdExceeded && isBetweenIndividuals

      if (isCustomerApplicable && transporter === "CHRONOPOST") return "maybe"
      return isPrivateApplicable || isCustomerApplicable ? "yes" : "no"
    }

    const taxApplicability = getTaxApplicability({
      dutyPrice,
      isBetweenIndividuals,
      origin,
      transporter,
    })

    const getChronopostFee = (dutyPrice: number, isBetweenIndividuals: boolean) => {
      if (dutyPrice < 100) {
        return isBetweenIndividuals ? CHRONOPOST_CARRIER_FEE_INF_1000 : CHRONOPOST_CARRIER_FEE
      }
      if (dutyPrice < 1000) return CHRONOPOST_CARRIER_FEE_INF_1000

      return CHRONOPOST_CARRIER_FEE_SUP_1000
    }

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

    const availableCategories = productResults.map((result) => ({
      categoryName: result.categoryName,
      tva: result.tva,
      om: result.om,
      omr: result.omr,
    }))

    const { tva, om, omr } = availableCategories[0]

    const omrPrice = Math.round((dutyPrice * omr) / 100)
    const omPrice = Math.round((dutyPrice * om) / 100)
    const tvaPrice = Math.round((dutyPrice * tva) / 100)

    let carrierFee = 0

    if (transporter === "CHRONOPOST" && origin === "EU") {
      carrierFee = getChronopostFee(dutyPrice, isBetweenIndividuals)
    } else if (transporter === "COLISSIMO" && origin === "EU") {
      carrierFee = COLISSIMO_CARRIER_FEE
    }

    const totalTaxes = omrPrice + omPrice + tvaPrice + carrierFee

    return {
      carrierFee,
      dutyPrice,
      products,
      totalTaxes,
      taxes: {
        applicable: taxApplicability,
        om,
        omr,
        tva,
      },
    } satisfies ParcelSimulatorResult
  }
}
