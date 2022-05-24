import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        loggedInUser: "unknown"
    }),
    actions: {
        setUser(name: string) {
            if (name !== this.loggedInUser) {
                this.loggedInUser = name
            }
        },
    }
})