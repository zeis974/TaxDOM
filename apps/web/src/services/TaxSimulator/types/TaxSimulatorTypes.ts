import type { SubmitHandler, FieldValues, Path } from "react-hook-form"

export type Territory =
	| "CORSE" // Corse
	| "FRANCE" // France continentale
	| "GUADELOUPE" // Guadeloupe
	| "GUYANE" // Guyane française
	| "MARTINIQUE" // Martinique
	| "MAYOTTE" // Mayotte
	| "REUNION" // Réunion

export type TaxSimulatorInputType = "input" | "select" | "radio"

export interface FormProps extends FieldValues {
	onSubmit: SubmitHandler<FieldValues>
}

export interface TaxSimulatorFormValues {
	product: string
	origin: string
	territory: Territory
	flux: "import" | "export"
}

export type TaxSimulatorFormLabel = Path<TaxSimulatorFormValues>

export interface TaxSimulatorInputProps {
	readonly name: string
	label: TaxSimulatorFormLabel
	readonly component: TaxSimulatorInputType
	required: boolean
	placeholder?: string
}
