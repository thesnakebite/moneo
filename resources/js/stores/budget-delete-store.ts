import { create } from 'zustand'
import { Budget } from "@/types/budget"

type Store = {
    open: boolean
    budget: Budget | null
    openModal: (budget: Budget) => void
    closeModal: () => void
}

export const useBudgetDeleteModalStore = create<Store>((set) => ({
    open: false,
    budget: null,
    openModal: (budget) => set({ open: true, budget }),
    closeModal: () => set({ open: false }),
}))
