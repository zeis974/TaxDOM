"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useId, useState } from "react"
import { toast } from "sonner"
import type { Origin, SelectOption } from "@taxdom/types"

import { InputContainer } from "@/components/Forms/Input/Input.styled"
import BaseSelect from "@/components/Forms/Select/BaseSelect"
import Modal from "@/components/Modal"
import Button from "@/components/ui/Button"
import {
  AddProductBtn,
  AddProductContainer,
  ProductActions,
  ErrorContainer,
} from "./AddProduct.styled"

export default function AddProduct() {
  const [open, setOpen] = useState(false)
  const [productName, setProductName] = useState("")
  const [categoryID, setCategoryID] = useState("")
  const [originID, setOriginID] = useState("")
  const [territoryID, setTerritoryID] = useState("")

  const productNameID = useId()
  const queryClient = useQueryClient()

  const API = process.env.NEXT_PUBLIC_API_URL

  const fetchCategories = async (): Promise<SelectOption[]> => {
    if (!API) throw new Error("Missing NEXT_PUBLIC_API_URL")
    const res = await fetch(`${API}/dashboard/categories`, {
      method: "GET",
      credentials: "include",
      headers: { "content-type": "application/json" },
    })
    if (!res.ok) throw new Error("Failed to fetch categories")
    const data = (await res.json()) as { categoryID: string; categoryName: string }[]
    return data.map(
      (c): SelectOption => ({
        name: c.categoryName,
        value: c.categoryName,
      }),
    )
  }

  const fetchOrigins = async (): Promise<SelectOption[]> => {
    if (!API) throw new Error("Missing NEXT_PUBLIC_API_URL")
    const res = await fetch(`${API}/dashboard/origins`, {
      method: "GET",
      credentials: "include",
      headers: { "content-type": "application/json" },
    })
    if (!res.ok) throw new Error("Failed to fetch origins")
    const data = (await res.json()) as Origin[]
    return data.map(
      (o): SelectOption => ({
        name: o.name,
        value: o.name,
        available: o.available,
        isEU: o.isEU,
      }),
    )
  }

  const fetchTerritories = async (): Promise<SelectOption[]> => {
    if (!API) throw new Error("Missing NEXT_PUBLIC_API_URL")
    const res = await fetch(`${API}/dashboard/territories`, {
      method: "GET",
      credentials: "include",
      headers: { "content-type": "application/json" },
    })
    if (!res.ok) throw new Error("Failed to fetch territories")
    const data = (await res.json()) as { territoryID: string; territoryName: string }[]
    return data.map(
      (t): SelectOption => ({
        name: t.territoryName,
        value: t.territoryName,
      }),
    )
  }

  const {
    data: categoryOptions = [],
    isFetching: categoriesLoading,
    error: categoriesError,
  } = useQuery<SelectOption[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 60 * 60 * 1000,
  })

  const {
    data: originOptions = [],
    isFetching: originsLoading,
    error: originsError,
  } = useQuery<SelectOption[], Error>({
    queryKey: ["origins"],
    queryFn: fetchOrigins,
    staleTime: 24 * 60 * 60 * 1000,
  })

  const {
    data: territoryOptions = [],
    isFetching: territoriesLoading,
    error: territoriesError,
  } = useQuery<SelectOption[], Error>({
    queryKey: ["territories"],
    queryFn: fetchTerritories,
    staleTime: 24 * 60 * 60 * 1000,
  })

  const isFormValid =
    productName.trim() && categoryID.trim() && originID.trim() && territoryID.trim()

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!API) throw new Error("Missing NEXT_PUBLIC_API_URL")
      const res = await fetch(`${API}/dashboard/products`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productName: productName.trim(),
          categoryName: categoryID.trim(),
          originName: originID.trim(),
          territoryName: territoryID.trim(),
        }),
      })
      if (!res.ok) {
        const msg = (await res.json().catch(() => ({}))).message || "Erreur de création"
        throw new Error(msg)
      }
      return res.json()
    },
    onSuccess: () => {
      toast.success("Produit ajouté")
      queryClient.invalidateQueries({ queryKey: ["products"] })
      setOpen(false)
      setProductName("")
      setCategoryID("")
      setOriginID("")
      setTerritoryID("")
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : "Impossible d'ajouter le produit"
      toast.error(message)
    },
  })

  return (
    <>
      <AddProductBtn onClick={() => setOpen(true)}>Ajouter un produit</AddProductBtn>
      <Modal {...{ open, setOpen }}>
        <AddProductContainer>
          <h2>Ajouter un produit</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <InputContainer>
              <label htmlFor={productNameID}>Nom du produit</label>
              <input
                type="text"
                name="productName"
                id={productNameID}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                autoComplete="off"
              />
            </InputContainer>
            <BaseSelect
              name="category"
              label="Catégorie"
              placeholder="Sélectionnez une catégorie"
              options={categoryOptions}
              value={categoryID}
              onChange={setCategoryID}
              loading={categoriesLoading}
              errors={categoriesError ? ["Impossible de charger les catégories"] : []}
              required
            />
            <BaseSelect
              name="origin"
              label="Origine"
              placeholder="Sélectionnez une origine"
              options={originOptions}
              value={originID}
              onChange={setOriginID}
              loading={originsLoading}
              errors={originsError ? ["Impossible de charger les origines"] : []}
              required
            />
            <BaseSelect
              name="territory"
              label="Territoire"
              placeholder="Sélectionnez un territoire"
              options={territoryOptions}
              value={territoryID}
              onChange={setTerritoryID}
              loading={territoriesLoading}
              errors={territoriesError ? ["Impossible de charger les territoires"] : []}
              required
            />
          </div>
          <ProductActions>
            <ErrorContainer>{/* Errors can be displayed here if needed */}</ErrorContainer>
            <div style={{ display: "flex", gap: 8 }}>
              <Button onClick={() => setOpen(false)}>Annuler</Button>
              <Button
                onClick={() => {
                  if (!isFormValid || createMutation.isPending) return
                  createMutation.mutate()
                }}
              >
                {createMutation.isPending ? "Ajout..." : "Ajouter"}
              </Button>
            </div>
          </ProductActions>
        </AddProductContainer>
      </Modal>
    </>
  )
}
