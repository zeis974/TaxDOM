import { type UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { fetchAPI } from "@/lib/api"

interface UseEntityMutationsOptions {
  queryKey: string[]
  messages: {
    create: string
    update: string
    delete: string
  }
}

interface MutationPayload {
  url: string
  body: Record<string, unknown>
}

type EntityMutations = {
  createMutation: UseMutationResult<unknown, Error, MutationPayload>
  updateMutation: UseMutationResult<unknown, Error, MutationPayload>
  deleteMutation: UseMutationResult<unknown, Error, string>
}

export function useEntityMutations(options: UseEntityMutationsOptions): EntityMutations {
  const queryClient = useQueryClient()

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: options.queryKey })
  }

  const createMutation = useMutation<unknown, Error, MutationPayload>({
    mutationFn: async (payload) => {
      return fetchAPI(payload.url, { method: "POST", body: JSON.stringify(payload.body) })
    },
    onSuccess: () => {
      invalidate()
      toast.success(options.messages.create)
    },
    onError: () => {
      toast.error("Erreur lors de la création")
    },
  })

  const updateMutation = useMutation<unknown, Error, MutationPayload>({
    mutationFn: async (payload) => {
      return fetchAPI(payload.url, { method: "PUT", body: JSON.stringify(payload.body) })
    },
    onSuccess: () => {
      invalidate()
      toast.success(options.messages.update)
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour")
    },
  })

  const deleteMutation = useMutation<unknown, Error, string>({
    mutationFn: async (url) => {
      return fetchAPI(url, { method: "DELETE" })
    },
    onSuccess: () => {
      invalidate()
      toast.success(options.messages.delete)
    },
    onError: () => {
      toast.error("Erreur lors de la suppression")
    },
  })

  return { createMutation, updateMutation, deleteMutation }
}
