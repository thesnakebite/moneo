import { create } from 'zustand'

type Store = {
    open: boolean
    openModal: () => void
    closeModal: () => void
}

export const useCancelSubscriptionModalStore = create<Store>((set) => ({
    open: false,
    openModal: () => set({ open: true }),
    closeModal: () => set({ open: false }),
}))
