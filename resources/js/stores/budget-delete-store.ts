import { create } from 'zustand'
import { Budget } from "@/types/budget"

type DeletableBudget = Pick<Budget, 'id' | 'name'>

type Store = {
    open: boolean
    budget: DeletableBudget | null
    openModal: (budget: DeletableBudget) => void
    closeModal: () => void
}

export const useBudgetDeleteModalStore = create<Store>((set) => ({
    open: false,
    budget: null,
    openModal: (budget) => set({ open: true, budget }),
    closeModal: () => set({ open: false }),
}))
