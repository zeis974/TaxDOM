import type { FieldComponent, FormState } from "@tanstack/react-form"
import type { ParcelSimulatorFormValues } from "@/services/ParcelSimulator/types"

import { AnimatePresence } from "framer-motion"
import { memo } from "react"
import { useFormStatus } from "react-dom"

import { useParcelSimulatorStore } from "@/providers/ParcelSimulatorStoreProvider"

import { Card, ParcelContent, Container, Loading } from "./ParcelSimulatorCards.styled"

import { AddIcon, TaxDOMLogo } from "@/components/Icons"
import { Input, Select } from "@/components/Inputs"
import ParcelSimulatorResult from "@/components/ParcelSimulatorForm/ParcelSimulatorResult"

type SubscribeType<TFormData> = <TSelected = NoInfer<FormState<TFormData>>>(props: {
  selector?: (state: FormState<TFormData>) => TSelected
  children: ((state: NoInfer<TSelected>) => React.ReactNode) | React.ReactNode
}) => React.ReactNode

const ParcelSimulatorCards = memo(function ParcelSimulatorCards({
  Field,
  Subscribe,
}: {
  Field: FieldComponent<any, undefined>
  Subscribe: SubscribeType<ParcelSimulatorFormValues>
}) {
  const { pending } = useFormStatus()

  console.log(pending)

  const hasResult = useParcelSimulatorStore((s) => s.hasResult)

  return (
    <Container>
      <ParcelContent>
        <Subscribe selector={(s) => s}>
          {({
            values: { deliveryPrice, products, territory },
          }: FormState<ParcelSimulatorFormValues>) => {
            const allProductPrice = products.reduce((acc, product) => {
              const price = Number.parseFloat(product.price?.toString() || "0") || 0
              return acc + price
            }, 0)

            const deliveryPriceValue = Number.parseFloat(deliveryPrice?.toString() || "0") || 0
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
        </Subscribe>
      </ParcelContent>
      <Field name="products" mode="array">
        {(field) => {
          return (
            <>
              {field.state.value.map((_: any, i: number) => (
                // biome-ignore lint/suspicious/noArrayIndexKey:
                <Card key={i}>
                  <Select
                    {...{ Field }}
                    name={`products.${i}.name`}
                    label="Produit"
                    placeholder="Ordinateur"
                    actions={{
                      dynamic: true,
                    }}
                  />
                  <Input
                    {...{ Field }}
                    name={`products.${i}.price`}
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
                disabled={field.state.value.length === 10}
              >
                <AddIcon />
                Ajouter un produit
              </button>
            </>
          )
        }}
      </Field>
      <Subscribe selector={(s) => [s.isFieldsValid, s.isSubmitting]}>
        {([isFieldsValid, isSubmitting]) => (
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
      </Subscribe>
      {hasResult && <ParcelSimulatorResult />}
    </Container>
  )
})

export default ParcelSimulatorCards
