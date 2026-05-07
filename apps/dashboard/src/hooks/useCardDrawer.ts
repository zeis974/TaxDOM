import { useCallback, useState } from "react"

export interface UseCardDrawerReturn {
  open: boolean
  isEditing: boolean
  deleteError: string | null
  isDeletingLocal: boolean
  setOpen: (open: boolean) => void
  setIsEditing: (editing: boolean) => void
  setDeleteError: (error: string | null) => void
  setIsDeletingLocal: (deleting: boolean) => void
  openDrawer: () => void
  closeDrawer: () => void
  startEditing: () => void
  stopEditing: () => void
  resetDrawer: () => void
}

export function useCardDrawer(): UseCardDrawerReturn {
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeletingLocal, setIsDeletingLocal] = useState(false)

  const openDrawer = useCallback(() => {
    setOpen(true)
    setIsEditing(false)
    setDeleteError(null)
  }, [])

  const closeDrawer = useCallback(() => {
    setOpen(false)
    setIsEditing(false)
    setDeleteError(null)
    setIsDeletingLocal(false)
  }, [])

  const startEditing = useCallback(() => {
    setIsEditing(true)
    setDeleteError(null)
  }, [])

  const stopEditing = useCallback(() => {
    setIsEditing(false)
    setDeleteError(null)
  }, [])

  const resetDrawer = useCallback(() => {
    setIsEditing(false)
    setDeleteError(null)
    setIsDeletingLocal(false)
  }, [])

  return {
    open,
    isEditing,
    deleteError,
    isDeletingLocal,
    setOpen,
    setIsEditing,
    setDeleteError,
    setIsDeletingLocal,
    openDrawer,
    closeDrawer,
    startEditing,
    stopEditing,
    resetDrawer,
  }
}
