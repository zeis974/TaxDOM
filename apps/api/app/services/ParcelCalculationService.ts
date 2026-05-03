import type { ParcelSimulatorResult } from "@taxdom/types"
import { eq, inArray } from "drizzle-orm"
import type { NodePgDatabase } from "drizzle-orm/node-postgres"

import type * as schema from "#database/schema"
import { categories, products as productsTable, taxes } from "#database/schema"

type DB = NodePgDatabase<typeof schema>

// As of April 1, 2023, the "franchise threshold" was raised to 400 euros
const FRANCHISE_THRESHOLD_BETWEEN_INDIVIDUALS = 400
const FRANCHISE_THRESHOLD_CUSTOMER = 22

// COLISSIMO
const COLISSIMO_CARRIER_FEE = 5

// CHRONOPOST
const CHRONOPOST_CARRIER_FEE_INF_1000 = 21
const CHRONOPOST_CARRIER_FEE = 10

const EU_COUNTRIES = [
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
] as const

export type ParcelProductInput = {
  name: string
  price: number
}

export type ParcelCalculationInput = {
  customer: string
  deliveryPrice: number
  origin: string
  products: ParcelProductInput[]
  transporter: string
}

export class ParcelCalculationService {
  constructor(private db: DB) {}

  private isEUCountry(country: string): boolean {
    return (EU_COUNTRIES as readonly string[]).includes(country.toUpperCase())
  }

  private getTaxApplicability({
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
    const fromEU = this.isEUCountry(origin)

    const privateThresholdExceeded = dutyPrice > FRANCHISE_THRESHOLD_BETWEEN_INDIVIDUALS
    const customerThresholdExceeded = dutyPrice > FRANCHISE_THRESHOLD_CUSTOMER

    const isPrivateApplicable = fromEU && privateThresholdExceeded && !isBetweenIndividuals
    const isCustomerApplicable = fromEU && customerThresholdExceeded && isBetweenIndividuals

    if (isCustomerApplicable && transporter === "CHRONOPOST") return "maybe"
    return isPrivateApplicable || isCustomerApplicable ? "yes" : "no"
  }

  private getChronopostFee(dutyPrice: number, isBetweenIndividuals: boolean): number {
    if (dutyPrice < 100) {
      return isBetweenIndividuals ? CHRONOPOST_CARRIER_FEE_INF_1000 : CHRONOPOST_CARRIER_FEE
    }
    if (dutyPrice < 1000) return CHRONOPOST_CARRIER_FEE_INF_1000

    return CHRONOPOST_CARRIER_FEE_INF_1000
  }

  async calculate(input: ParcelCalculationInput): Promise<ParcelSimulatorResult> {
    const { customer, deliveryPrice, origin, products, transporter } = input

    const totalProductPrice = products.reduce((acc, product) => acc + product.price, 0)
    const dutyPrice = totalProductPrice + deliveryPrice
    const isBetweenIndividuals = customer === "Oui"

    const taxApplicability = this.getTaxApplicability({
      dutyPrice,
      isBetweenIndividuals,
      origin,
      transporter,
    })

    const productNames = products.map((product) => product.name)
    const productResults = await this.db
      .select({
        categoryName: categories.categoryName,
        tva: taxes.tva,
        om: taxes.om,
        omr: taxes.omr,
      })
      .from(productsTable)
      .innerJoin(categories, eq(productsTable.categoryID, categories.categoryID))
      .innerJoin(taxes, eq(categories.taxID, taxes.taxID))
      .where(inArray(productsTable.productName, productNames))

    const availableCategories = productResults.map((result) => ({
      categoryName: result.categoryName,
      tva: Number(result.tva),
      om: Number(result.om),
      omr: Number(result.omr),
    }))

    const { tva, om, omr } = availableCategories[0] ?? { tva: 0, om: 0, omr: 0 }

    const omrPrice = Math.round((dutyPrice * omr) / 100)
    const omPrice = Math.round((dutyPrice * om) / 100)
    const tvaPrice = Math.round((dutyPrice * tva) / 100)

    let carrierFee = 0

    if (transporter === "CHRONOPOST" && this.isEUCountry(origin)) {
      carrierFee = this.getChronopostFee(dutyPrice, isBetweenIndividuals)
    } else if (transporter === "COLISSIMO" && this.isEUCountry(origin)) {
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
    }
  }
}
