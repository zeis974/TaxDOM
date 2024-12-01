export type ParcelSimulatorFormValues = {
  customer: string
  origin: string
  products: Array<{
    name: string
    price: number | undefined
  }>
  store: string
  territory: string
}
