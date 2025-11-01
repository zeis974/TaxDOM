import { db } from "#config/database"
import type { HttpContext } from "@adonisjs/core/http"
import type { ParcelSimulatorResult } from "@taxdom/types"
import { eq, inArray } from "drizzle-orm"

import { categories, products as productsTable, taxes } from "#database/schema"
import { CalculateParcelTaxeValidator } from "#validators/CalculateParcelTaxeValidator"

// As of April 1, 2023, the "franchise threshold" was raised to 400 euros
const FRANCHISE_THRESHOLD_BETWEEN_INDIVIDUALS = 400
const FRANCHISE_THRESHOLD_CUSTOMER = 22

// COLISSIMO
const COLISSIMO_CARRIER_FEE = 5

// CHRONOPOST
const CHRONOPOST_CARRIER_FEE_INF_1000 = 21
const CHRONOPOST_CARRIER_FEE_SUP_1000 = 29
const CHRONOPOST_CARRIER_FEE = 10

const EU_COUNTRIES = new Set([
  "ALLEMAGNE",
  "AUTRICHE",
  "BELGIQUE",
  "BULGARIE",
  "CHYPRE",
  "CROATIE",
  "DANEMARK",
  "ESPAGNE",
  "ESTONIE",
  "FINLANDE",
  "FRANCE",
  "GRECE",
  "HONGRIE",
  "IRLANDE",
  "ITALIE",
  "LETTONIE",
  "LITUANIE",
  "LUXEMBOURG",
  "MALTE",
  "PAYS-BAS",
  "POLOGNE",
  "PORTUGAL",
  "REPUBLIQUE TCHEQUE",
  "ROUMANIE",
  "SLOVAQUIE",
  "SLOVENIE",
  "SUEDE",
])

function isEUCountry(country: string): boolean {
  return EU_COUNTRIES.has(country)
}

export default class CalculateParcelController {
  async handle({ request }: HttpContext) {
    const data = request.body()

    const payload = await CalculateParcelTaxeValidator.validate(data)

    const { customer, deliveryPrice, origin, products, transporter } = payload

    const totalProductPrice = products.reduce((acc, product) => acc + product.price, 0)
    const dutyPrice = totalProductPrice + deliveryPrice
    const isBetweenIndividuals = customer === "Oui"
    const isOriginEU = isEUCountry(origin) // Cache EU check result

    function getTaxApplicability({
      dutyPrice,
      isBetweenIndividuals,
      isOriginEU,
      transporter,
    }: {
      dutyPrice: number
      isBetweenIndividuals: boolean
      isOriginEU: boolean
      transporter: string
    }): "yes" | "no" | "maybe" {
      const privateThresholdExceeded = dutyPrice > FRANCHISE_THRESHOLD_BETWEEN_INDIVIDUALS
      const customerThresholdExceeded = dutyPrice > FRANCHISE_THRESHOLD_CUSTOMER

      const isPrivateApplicable = isOriginEU && privateThresholdExceeded && !isBetweenIndividuals
      const isCustomerApplicable = isOriginEU && customerThresholdExceeded && isBetweenIndividuals

      if (isCustomerApplicable && transporter === "CHRONOPOST") return "maybe"
      return isPrivateApplicable || isCustomerApplicable ? "yes" : "no"
    }

    const taxApplicability = getTaxApplicability({
      dutyPrice,
      isBetweenIndividuals,
      isOriginEU,
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
      .limit(1) // Only fetch one result since we use the first one

    // Use first result directly instead of creating a new array
    if (productResults.length === 0) {
      return { error: "No tax data found for the provided products" }
    }

    const { tva, om, omr } = productResults[0]

    const omrPrice = Math.round((dutyPrice * omr) / 100)
    const omPrice = Math.round((dutyPrice * om) / 100)
    const tvaPrice = Math.round((dutyPrice * tva) / 100)

    let carrierFee = 0

    if (isOriginEU) {
      if (transporter === "CHRONOPOST") {
        carrierFee = getChronopostFee(dutyPrice, isBetweenIndividuals)
      } else if (transporter === "COLISSIMO") {
        carrierFee = COLISSIMO_CARRIER_FEE
      }
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
