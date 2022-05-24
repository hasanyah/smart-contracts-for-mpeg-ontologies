import { defineStore } from 'pinia'
import { Contract } from '../types/ContractTypes.interface'

export const useContractStore = defineStore({
    id: 'contract',
    state: () => ({
        contracts: []
    }),
    getters: {
        getCreatedDate: (state) => {
            return (contractName: string): string => {
                let contract = state.contracts.find((contract) => contract.name === contractName)
                return contract.versions.at(0).created.toLocaleDateString("es-ES"); 
            }
        },
        getLastModifiedDate: (state) => {
            return (contractName: string): string => {
                let contract = state.contracts.find((contract) => contract.name === contractName)
                return contract.versions.at(-1).created.toLocaleDateString("es-ES");
            }
        },
    },
    actions: {
        createNewContract(newContract: Contract) {
            console.log("Creating a new contract")
            this.contracts.push(newContract);
            console.log(this.contracts)
        },
        deleteContract(name: string) {
            this.contracts = this.contracts.filter((contract) => {
                return contract.name !== name;
            });
        }
    }
})