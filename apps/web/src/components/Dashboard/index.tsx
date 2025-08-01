import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { authClient } from "@/lib/auth-client"

import Categories from "./Categories"
import Origins from "./Origins"
import Products from "./Products"
import Sidebar from "./Sidebar"
import Territories from "./Territories"

import { Content, Section } from "./Dashboard.styled"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Dashboard(props: { searchParams: SearchParams }) {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })

  const searchParams = await props.searchParams
  const tab = Array.isArray(searchParams.tab) ? searchParams.tab[0] : searchParams.tab
  const layouts: "products" | "categories" | "origins" | "territories" =
    tab === "products" || tab === "categories" || tab === "origins" || tab === "territories"
      ? tab
      : "products"

  const renderLayout = () => {
    switch (layouts) {
      case "products":
        return <Products searchParams={props.searchParams} />
      case "categories":
        return <Categories searchParams={props.searchParams} />
      case "origins":
        return <Origins searchParams={props.searchParams} />
      case "territories":
        return <Territories searchParams={props.searchParams} />
    }
  }

  return (
    <Section>
      <Sidebar />
      <Content>{renderLayout()}</Content>
    </Section>
  )
}
