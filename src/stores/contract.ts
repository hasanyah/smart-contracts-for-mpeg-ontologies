import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { Contract } from '../types/ContractTypes.interface'

export const useContractStore = defineStore({
    id: 'contract',
    state: () => ({
        localContracts: [],
        selectedContract: ''
    }),
    getters: {
        getCreatedDate: (state) => {
            return (contractName: string): string => {
                let contract = state.localContracts.find((contract) => contract.name === contractName);
                return contract.versions.at(0).created.toLocaleDateString("es-ES"); 
            }
        },
        getLastModifiedDate: (state) => {
            return (contractName: string): string => {
                let contract = state.localContracts.find((contract) => contract.name === contractName);
                return contract.versions.at(-1).created.toLocaleDateString("es-ES");
            }
        },
        getContractsBelongingToTheUser(): Contract[] {
            const userStore = useUserStore()
            let contracts = this.localContracts.filter((contract) => {
                return contract.creator === userStore.loggedInUser;
            });
            return contracts;
        },
        getContractByName: (state) => {
            return (contractName: string): Contract => {
                return state.localContracts.find((contract) => contract.name === contractName);
            }
        }
    },
    actions: {
        setSelectedContract(name: string) {
            this.selectedContract = name;
        },
        createNewContract(newContract: Contract) {
            this.localContracts.push(newContract);
        },
        deleteContract(name: string) {
            this.localContracts = this.localContracts.filter((contract) => {
                return contract.name !== name;
            });
        }
    }
})