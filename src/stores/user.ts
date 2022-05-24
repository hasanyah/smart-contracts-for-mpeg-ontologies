import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        name: "unknown"
    }),
    actions: {
        setUser(name: string) {
            if (name !== this.name) {
                this.name = name
            }
        },
    }
})