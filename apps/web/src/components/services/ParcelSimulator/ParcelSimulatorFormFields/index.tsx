"use client"

import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile"

import { parcelFormOpts, withForm } from "@/hooks/form"

interface ParcelSimulatorFormFieldsProps {
  turnstileRef: React.RefObject<TurnstileInstance | null>
  originOptions: { name: string }[]
  territoryOptions: { name: string }[]
  transporterOptions: { name: string }[]
}

const ParcelSimulatorFormFields = withForm({
  ...parcelFormOpts,
  props: {
    turnstileRef: { current: null } as unknown as React.RefObject<TurnstileInstance | null>,
    originOptions: [],
    territoryOptions: [],
    transporterOptions: [],
  } as ParcelSimulatorFormFieldsProps,
  render: function Render({
    form,
    turnstileRef,
    originOptions,
    territoryOptions,
    transporterOptions,
  }) {
    return (
      <div>
        <form.AppField name="origin">
          {(field) => (
            <field.SelectField label="Origine" placeholder="EU" options={originOptions} />
          )}
        </form.AppField>
        <form.AppField name="territory">
          {(field) => (
            <field.SelectField
              label="Territoire d'application"
              placeholder="REUNION"
              options={territoryOptions}
            />
          )}
        </form.AppField>
        <form.AppField name="customer">
          {(field) => (
            <field.RadioField label="Envoi entre particulier ?" options={["Oui", "Non"]} />
          )}
        </form.AppField>
        <form.AppField name="transporter">
          {(field) => (
            <field.SelectField
              label="Transporteur"
              placeholder="COLISSIMO"
              options={transporterOptions}
            />
          )}
        </form.AppField>
        <form.AppField name="deliveryPrice">
          {(field) => (
            <field.InputField label="Prix de livraison € (HT)" placeholder="0" type="number" />
          )}
        </form.AppField>
        <Turnstile ref={turnstileRef} />
        <form.AppForm>
          <form.SubscribeButton label="Calculer" />
        </form.AppForm>
      </div>
    )
  },
})

export default ParcelSimulatorFormFields
