import type { OriginData, TerritoryData } from "../data"

type OriginDataType = typeof OriginData
export type OriginDataValue = (typeof OriginData)[number]["name"]

type TerritoryDataType = typeof TerritoryData
export type TerritoryDataValue = (typeof TerritoryData)[number]["name"]

export type TerritoryAndOriginDataValue =
  | (typeof OriginData)[number]["name"]
  | (typeof TerritoryData)[number]["name"]

export type TerritoryAndOriginType = OriginDataType | TerritoryDataType
