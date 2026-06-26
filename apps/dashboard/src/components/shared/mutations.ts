import type { QueryClient, QueryKey } from "@tanstack/react-query"
import { toast } from "sonner"

type CrudHandlerOptions = {
  success: string
  error: string
  onSuccess?: () => void
}

/**
 * Fabrique les callbacks onSuccess/onError partagés par toutes les mutations CRUD :
 * invalidation de la liste + toast + callback de fermeture.
 *
 * Usage :
 *   useMutation(api.categories.update.mutationOptions(
 *     crudHandlers(queryClient, api.categories.index.pathKey(), {
 *       success: "Catégorie mise à jour",
 *       error: "Erreur lors de la mise à jour",
 *       onSuccess: drawer.closeDrawer,
 *     }),
 *   ))
 */
export function crudHandlers(
  queryClient: QueryClient,
  pathKey: QueryKey,
  { success, error, onSuccess }: CrudHandlerOptions,
) {
  return {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pathKey })
      toast.success(success)
      onSuccess?.()
    },
    onError: () => {
      toast.error(error)
    },
  }
}
