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
