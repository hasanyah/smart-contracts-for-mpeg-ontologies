import { defineStore } from 'pinia'

export const useContractStore = defineStore({
  id: 'contract',
  state: () => ({
    parties: [],
    deontics: [],
    actions: [],
    objects: [],
    loading: false
  }),
  getters: {
    getParty: (state) => {
      return (partyId) => state.parties.filter((party) => party.identifier== partyId)
    }
  },
  actions: {
    async fetchSmartContractId() {
      this.parties = []
      this.loading = true
      try {
        this.parties = await fetch('https://https://scm.linkeddata.es/api/contracts/')
        .then((response) => response.json()) 
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})