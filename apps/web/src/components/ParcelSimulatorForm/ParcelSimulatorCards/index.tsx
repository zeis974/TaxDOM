import type { ParcelSimulatorFormValues } from "@/services/ParcelSimulator/types"

import { AnimatePresence } from "motion/react"

import { useParcelSimulatorStore } from "@/providers/ParcelSimulatorStoreProvider"
import { formOpts, withForm } from "@/hooks/form"

import { Card, ParcelContent, Container, Loading } from "./ParcelSimulatorCards.styled"

import { AddIcon, TaxDOMLogo } from "@/components/Icons"
import { Input, Select } from "@/components/Forms"
import ParcelSimulatorResult from "@/components/ParcelSimulatorForm/ParcelSimulatorResult"

// TODO : Fix any types
export default function ParcelSimulatorField({ form }: { form: any }) {
  const hasResult = useParcelSimulatorStore((s) => s.hasResult)

  return (
    <Container>
      <ParcelContent>
        <form.Subscribe selector={(s: any) => s}>
          {({
            values: { deliveryPrice, products, territory },
          }: {
            values: {
              deliveryPrice: number
              products: ParcelSimulatorFormValues["products"]
              territory: string
            }
          }) => {
            const allProductPrice = (products as ParcelSimulatorFormValues["products"]).reduce(
              (acc: number, product: { name: string; price: number }) => {
                const price = Number.parseFloat(product.price?.toString() || "0") || 0
                return acc + price
              },
              0,
            )

            const deliveryPriceValue =
              Number.parseFloat((deliveryPrice as number)?.toString() || "0") || 0
            const dutyPrice = allProductPrice + deliveryPriceValue

            return (
              <>
                <div>
                  {dutyPrice > 10000 ? "🤑" : "Valeur en douane"} : {dutyPrice.toFixed(2)} € (HT)
                </div>
                <div>Pays : {territory}</div>
              </>
            )
          }}
        </form.Subscribe>
      </ParcelContent>
      <form.Field name="products" mode="array">
        {(field: any) => (
          <>
            {(field.state.value as { name: string; price: number }[]).map((_, i: number) => (
              // biome-ignore lint/suspicious/noArrayIndexKey:
              <Card key={i}>
                <Select
                  {...{ form }}
                  name={`products.${i}.name` as any}
                  label="Produit"
                  placeholder="Ordinateur"
                  actions={{
                    dynamic: true,
                  }}
                />
                <Input
                  {...{ form }}
                  name={`products.${i}.price` as any}
                  label="Prix € (HT)"
                  placeholder="0"
                  type="number"
                />
                <button onClick={() => field.removeValue(i)} type="button">
                  Supprimer
                </button>
              </Card>
            ))}
            <button
              onClick={() => field.pushValue({ name: "", price: "" as unknown as number })}
              type="button"
              disabled={(field.state.value as { name: string; price: number }[]).length === 10}
            >
              <AddIcon />
              Ajouter un produit
            </button>
          </>
        )}
      </form.Field>
      <form.Subscribe selector={(s: any) => [s.isFieldsValid, s.isSubmitting]}>
        {([isFieldsValid, isSubmitting]: [boolean, boolean]) => (
          <AnimatePresence>
            {isFieldsValid && isSubmitting ? (
              <Loading
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div>
                  <TaxDOMLogo />
                </div>
                <span>Calcul en cours...</span>
              </Loading>
            ) : null}
          </AnimatePresence>
        )}
      </form.Subscribe>
      {hasResult && <ParcelSimulatorResult />}
    </Container>
  )
}

export const ParcelSimulatorCards = withForm({
  ...formOpts,
  render: ({ form }) => <ParcelSimulatorField {...{ form }} />,
})
