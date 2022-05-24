import { defineStore } from 'pinia'
import { Contract } from '../types/ContractTypes.interface'

export const useContractStore = defineStore({
    id: 'contract',
    state: () => ({
        contracts: []
    }),
    actions: {
        async createNewContract(newContract: Contract) {
            console.log("Creating a new contract")
            this.contracts.push(newContract);
            console.log(this.contracts)
        }
    }
})