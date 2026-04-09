import { type UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface UseMutationHooksOptions {
  queryKey: string[]
  successMessages: {
    create: string
    update: string
    delete: string
  }
  errorMessages?: {
    create?: string
    update?: string
    delete?: string
  }
}

export function useMutationHooks(options: UseMutationHooksOptions) {
  const queryClient = useQueryClient()

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: options.queryKey })
  }

  const createMutation = useMutation<unknown, Error, unknown>({
    mutationFn: async (variables: { mutationFn: () => Promise<unknown> }) => {
      return variables.mutationFn()
    },
    onSuccess: () => {
      invalidate()
      toast.success(options.successMessages.create)
    },
    onError: () => {
      toast.error(options.errorMessages?.create ?? "Erreur lors de la création")
    },
  })

  const updateMutation = useMutation<unknown, Error, unknown>({
    mutationFn: async (variables: { mutationFn: () => Promise<unknown> }) => {
      return variables.mutationFn()
    },
    onSuccess: () => {
      invalidate()
      toast.success(options.successMessages.update)
    },
    onError: () => {
      toast.error(options.errorMessages?.update ?? "Erreur lors de la mise à jour")
    },
  })

  const deleteMutation = useMutation<unknown, Error, unknown>({
    mutationFn: async (variables: { mutationFn: () => Promise<unknown> }) => {
      return variables.mutationFn()
    },
    onSuccess: () => {
      invalidate()
      toast.success(options.successMessages.delete)
    },
    onError: () => {
      toast.error(options.errorMessages?.delete ?? "Erreur lors de la suppression")
    },
  })

  return { createMutation, updateMutation, deleteMutation }
}
