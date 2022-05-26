import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { Contract, VersionSummary, Party } from '../types/ContractTypes.interface'

export const useContractStore = defineStore({
    id: 'contract',
    state: () => ({
        localContracts: [],
        selectedContract: '',
        parties: [],
        ipObjects: []
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
        },
        getVersionListByContractName(): VersionSummary[] {
            let contract = this.localContracts.find((contract) => contract.name === this.selectedContract);
            let versions = [];
            contract.versions.forEach(element => {
                versions.push({date: element.created, versionNumber: element.versionNumber})
            });

            return versions;
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