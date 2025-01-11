export type ParcelSimulatorFormValues = {
  customer: string
  origin: string
  products: Array<{
    name: string
    price: number
  }>
  deliveryPrice: number
  territory: string
  transporter: string
  "cf-turnstile-response": string
}

export type ParcelSimulatorResult = {
  carrierFee: number
  dutyPrice: number
  totalTaxes: number
  taxes: {
    tva: number
    om: number
    omr: number
  }
  taxesInfo: {
    applicable: boolean
    privateCustomer: boolean
  }
  products: Array<{
    name: string
    price: number
  }>
}
