import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        loggedInUser: "unknown",
        loggedIn: false
    }),
    actions: {
        setUser(name: string) {
            if (name !== this.loggedInUser) {
                this.loggedInUser = name;
                this.loggedIn = true;
            }
        },
    }
})