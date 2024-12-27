export type ParcelSimulatorFormValues = {
  customer: string
  origin: string
  products: Array<{
    name: string
    price: number | undefined
  }>
  deliveryPrice: number | undefined
  territory: string
  transporter: string
}

export type ParcelSimulatorResult = {
  isTaxesForPrivateCustomerApplicable: boolean
  taxes: {
    tva: number
    om: number
    omr: number
  }
  carrierFee: number
  dutyPrice: number
  totalTaxes: number
  products: Array<{
    name: string
    price: number
  }>
}
