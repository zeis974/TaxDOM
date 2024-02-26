import type {
	TaxSimulatorInputProps,
	Territory,
} from "@/services/TaxSimulator/types/TaxSimulatorTypes"

export const TaxSimulatorInputData: TaxSimulatorInputProps[] = [
	{
		name: "Produit",
		label: "product",
		component: "input",
		required: true,
		placeholder: "Smartphone",
	},
	{
		name: "Origine",
		label: "origin",
		component: "select",
		required: true,
		placeholder: "France",
	},
	{
		name: "Territoire d'application",
		label: "territory",
		component: "select",
		required: true,
		placeholder: "Réunion",
	},
	{
		name: "Flux",
		label: "flux",
		component: "radio",
		required: true,
	},
]

export const TaxSimulatorTerritoryData: Territory[] = [
	"CORSE",
	"FRANCE",
	"GUADELOUPE",
	"GUYANE",
	"MARTINIQUE",
	"MAYOTTE",
	"REUNION",
]
