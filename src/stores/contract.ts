import { defineStore } from 'pinia'
import { Contract } from '../types/ContractTypes.interface'

export const useContractStore = defineStore({
    id: 'contract',
    state: () => ({
        localContracts: []
    }),
    getters: {
        getCreatedDate: (state) => {
            return (contractName: string): string => {
                let contract = state.localContracts.find((contract) => contract.name === contractName)
                return contract.versions.at(0).created.toLocaleDateString("es-ES"); 
            }
        },
        getLastModifiedDate: (state) => {
            return (contractName: string): string => {
                let contract = state.localContracts.find((contract) => contract.name === contractName)
                return contract.versions.at(-1).created.toLocaleDateString("es-ES");
            }
        },
    },
    actions: {
        createNewContract(newContract: Contract) {
            console.log("Creating a new contract")
            this.localContracts.push(newContract);
            console.log(this.localContracts)
        },
        deleteContract(name: string) {
            this.localContracts = this.localContracts.filter((contract) => {
                return contract.name !== name;
            });
        }
    }
})