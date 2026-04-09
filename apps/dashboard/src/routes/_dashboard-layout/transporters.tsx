import { createFileRoute } from "@tanstack/react-router"
import type { Transporter } from "@taxdom/types"
import Transporters from "@/components/Dashboard/Transporters"
import { useEntityMutations } from "@/hooks/useEntityMutations"
import { fetchAPI } from "@/lib/api"

export const Route = createFileRoute("/_dashboard-layout/transporters")({
  loader: async ({ context }) => {
    const transporters = await context.queryClient.ensureQueryData<Transporter[]>({
      queryKey: ["transporters"],
      queryFn: () => fetchAPI("/v1/admin/transporters/list"),
    })

    return { transporters }
  },
  component: TransportersPage,
})

function TransportersPage() {
  const { transporters } = Route.useLoaderData()

  const { createMutation, updateMutation, deleteMutation } = useEntityMutations({
    queryKey: ["transporters"],
    messages: {
      create: "Transporteur créé avec succès",
      update: "Transporteur mis à jour",
      delete: "Transporteur supprimé",
    },
  })

  return (
    <Transporters
      transporters={transporters}
      onCreate={(data) =>
        createMutation.mutateAsync({
          url: "/v1/admin/transporters",
          body: data,
        })
      }
      onUpdate={(data) =>
        updateMutation.mutateAsync({
          url: `/v1/admin/transporters/${data.transporterID}`,
          body: data,
        })
      }
      onDelete={(id) => deleteMutation.mutateAsync(`/v1/admin/transporters/${id}`)}
      isCreating={createMutation.isPending}
      isUpdating={updateMutation.isPending}
      isDeleting={deleteMutation.isPending}
      createErrors={createMutation.error ? ["Erreur lors de la création"] : []}
      updateErrors={updateMutation.error ? ["Erreur lors de la mise à jour"] : []}
      deleteErrors={deleteMutation.error ? ["Erreur lors de la suppression"] : []}
    />
  )
}
