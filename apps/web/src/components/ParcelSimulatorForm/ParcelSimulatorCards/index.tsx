import { AnimatePresence } from "motion/react"

import { useParcelSimulatorStore } from "@/providers/ParcelSimulatorStoreProvider"
import { formOpts, withForm } from "@/hooks/form"

import { AddIcon, TaxDOMLogo } from "@/components/Icons"
import { Input, Select } from "@/components/Forms"
import ParcelSimulatorResult from "@/components/ParcelSimulatorForm/ParcelSimulatorResult"
import ParcelSimulatorTemplate from "@/components/ParcelSimulatorForm/ParcelSimulatorTemplate"

import { Card, ParcelContent, Container, Loading } from "./ParcelSimulatorCards.styled"

export const ParcelSimulatorCards = withForm({
  ...formOpts,
  render: function Render({ form }) {
    const hasResult = useParcelSimulatorStore((s) => s.hasResult)

    return (
      <Container>
        <ParcelContent>
          <form.Subscribe selector={(s) => s}>
            {({ values: { deliveryPrice, products, territory } }) => {
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
                    <div>Pays : {territory}</div>
                  </div>
                  <ParcelSimulatorTemplate form={form} />
                </>
              )
            }}
          </form.Subscribe>
        </ParcelContent>
        <form.Field name="products" mode="array">
          {(field) => (
            <>
              {field.state.value.map((_, i) => {
                return (
                  // biome-ignore lint/suspicious/noArrayIndexKey:
                  <Card key={i}>
                    <Select
                      {...{ form }}
                      name={`products[${i}].name`}
                      label="Produit"
                      placeholder="Type de produit"
                      actions={{
                        dynamic: true,
                      }}
                    />
                    <Input
                      {...{ form }}
                      name={`products[${i}].price`}
                      label="Prix € (HT)"
                      placeholder="0"
                      type="number"
                    />
                    <button
                      onClick={() => {
                        field.removeValue(i)
                      }}
                      type="button"
                    >
                      Supprimer
                    </button>
                  </Card>
                )
              })}
              <button
                onClick={() => field.pushValue({ name: "", price: "" as unknown as number })}
                type="button"
                disabled={field.state.value.length === 10}
              >
                <AddIcon />
                Ajouter un produit
              </button>
            </>
          )}
        </form.Field>
        <form.Subscribe selector={(s) => [s.isFieldsValid, s.isSubmitting]}>
          {([isFieldValids, isSubmitting]) => {
            return (
              <AnimatePresence>
                {isFieldValids && isSubmitting ? (
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
            )
          }}
        </form.Subscribe>
        {hasResult && <ParcelSimulatorResult />}
      </Container>
    )
  },
})
