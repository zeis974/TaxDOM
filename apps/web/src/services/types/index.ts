import type { OriginData, TerritoryData } from "../data"

type OriginDataType = (typeof OriginData)[number]["name"]
export type OriginDataValue = (typeof OriginData)[number]["name"]

type TerritoryDataType = typeof TerritoryData
export type TerritoryDataValue = (typeof TerritoryData)[number]["name"]

export type TerritoryAndOriginDataValue = OriginDataValue | TerritoryDataValue
export type TerritoryAndOriginType = OriginDataType | TerritoryDataType
