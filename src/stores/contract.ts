import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { Contract, Version, VersionSummary, Party, IPObject } from '../types/ContractTypes.interface'

function isPartyEqual(pLeft: Party, pRight: Party): Boolean {
    return (
        pLeft.class === pRight.class &&
        pLeft.role === pRight.role &&
        pLeft.identifier === pRight.identifier &&
        pLeft.metadata["rdfs:label"] === pRight.metadata["rdfs:label"] &&
        pLeft.deonticsIssued.every(d => pRight.deonticsIssued.includes(d)) &&
        pRight.deonticsIssued.every(d => pLeft.deonticsIssued.includes(d)) &&
        pLeft.actionsIsSubject === pRight.actionsIsSubject
    )
}

function findContractByName(contractName: string, arrayOfContracts: Contract[]) {
    console.log("Getting contract by name: " + contractName)
    let contract = arrayOfContracts.find((contract) => contract.name === contractName);
    return contract;
}

function findVersionByNumber(versionNumber: number, contract: Contract) {
    console.log("Getting version by number: " + versionNumber)
    let version = contract.versions.find((version) => version.versionNumber === versionNumber);
    return version;
}

export const useContractStore = defineStore({
    id: 'contract',
    state: () => ({
        localContracts: [],
        versionCount: 0
    }),
    getters: {
        getCreatedDate: (state) => {
            return (contractID: string): string => {
                console.log("Getting create date for contract: " + contractID)
                let contract = findContractByName(contractID, state.localContracts);
                return new Date(contract.versions.at(0).created).toLocaleDateString("es-ES"); 
            }
        },
        getLastModifiedDate: (state) => {
            return (contractID: string): string => {
                console.log("Getting last modified date for contract: " + contractID)
                let contract = findContractByName(contractID, state.localContracts);
                return new Date(contract.versions.at(-1).created).toLocaleDateString("es-ES");
            }
        },
        getContractsBelongingToTheUser(): Contract[] {
            console.log("Getting contracts belonging to the user")
            const userStore = useUserStore()
            let contracts = this.localContracts.filter((contract) => {
                return contract.creator === userStore.loggedInUser;
            });
            return contracts;
        },
        getContractByName: (state) => {
            return (contractID: string): Contract => {
                console.log("Getting contract by name: " + contractID)
                return findContractByName(contractID, state.localContracts);
            }
        },
        getVersionListByContractName: (state) => {
            return (contractID: string): VersionSummary[] => {
                console.log("Getting version list by contract name: " + contractID)
                let contract = findContractByName(contractID, state.localContracts);
                let versions = [];
                contract.versions.forEach(element => {
                    versions.push({date: element.created, versionNumber: element.versionNumber});
                });
    
                return versions;
            }
        },
        getVersionByNumber: (state) => {
            return (contractID: string, versionId: number): Version => {
                console.log("Getting version for contract: " + contractID + " and number: " + versionId)
                let contract = findContractByName(contractID, state.localContracts);
                let version = findVersionByNumber(versionId, contract);
                return version;
            }
        },
    },
    actions: {
        deleteContract(name: string) {
            this.localContracts = this.localContracts.filter((contract) => {
                return contract.name !== name;
            });
        },
        // addParty(party: Party) {
        //     let contract = this.localContracts.find((contract) => contract.name === this.selectedContract);
        //     contract.versions.at(-1).parties.push(party)
        // },
        // addIPObject(ipObject: IPObject) {
        //     let contract = this.localContracts.find((contract) => contract.name === this.selectedContract);
        //     contract.versions.at(-1).ipObjects.push(ipObject)
        // },
        createNewContract() {
            let currentDate = new Date;
            let oldDate = new Date;
            oldDate.setDate(currentDate.getDate()-10);

            let loggedInUser = useUserStore().loggedInUser
            let newContract = {
                name: 'mContract'+this.versionCount,
                creator: loggedInUser,
                versions : [
                    {
                        versionNumber : 0,
                        parties: [
                            {
                                class: 'OldCreator',
                                role: 'OldCreator',
                                identifier: 'oldCreatorId',
                                metadata: {
                                    "rdfs:label": 'Creator v1'
                                },
                                deonticsIssued: ['p4'],
                                actionsIsSubject: [],
                            },
                            {
                                class: 'Creator',
                                role: 'Creator',
                                identifier: 'creatorId',
                                address: 'Old Address',
                                metadata: {
                                    "rdfs:label": 'Creator v2'
                                },
                                deonticsIssued: ['p4'],
                                actionsIsSubject: [],
                            },
                            {
                                class: 'Distributor',
                                role: 'Distributor',
                                identifier: 'distributorId',
                                metadata: {
                                    "rdfs:label": 'Dist v1'
                                },
                                deonticsIssued: ['p4', 'o1'],
                                actionsIsSubject: ['a5'],
                            },
                            {
                                class: 'Distributor',
                                role: 'Distributor',
                                identifier: 'streamingServiceId',
                                metadata: {
                                    "rdfs:label": 'Streaming Service'
                                },
                                deonticsIssued: ['o4', 'o5', 'o6', 'o7', 'o8', 'o9', 'p1'],
                                actionsIsSubject: ['a2', 'p2', 'p3', 'p4'],
                            }
                        ],
                        deontics: [
                            {
                                class: "Obligation",
                                type: "Obligation",
                                identifier: "o4",
                                metadata: {
                                "rdfs:label": "Streaming service pays 10% to publisher"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/StreamingService",
                                act: "http://mpeg.org/pay2",
                                actedBySubject: "http://mpeg.org/StreamingService"
                            },
                            {
                                class: "Obligation",
                                type: "Obligation",
                                identifier: "o5",
                                metadata: {
                                "rdfs:label": "Streaming service pays 1% to PRO"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/StreamingService",
                                act: "http://mpeg.org/pay3",
                                actedBySubject: "http://mpeg.org/StreamingService"
                            },
                            {
                                class: "MCOPermission",
                                type: "MCOPermission",
                                identifier: "p4",
                                metadata: {
                                "rdfs:label": "Author authorises indie label to distribute"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/Author",
                                act: "http://mpeg.org/action4",
                                actedBySubject: "http://mpeg.org/RecordLabel",
                                actObjects: [
                                "http://mpeg.org/Song"
                                ]
                            },
                            {
                                class: "Obligation",
                                type: "Obligation",
                                identifier: "o1",
                                metadata: {
                                "rdfs:label": "Publisher provide a song to streaming"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/Publisher",
                                act: "http://mpeg.org/action5",
                                actedBySubject: "http://mpeg.org/Publisher",
                                actObjects: [
                                "http://mpeg.org/Song"
                                ]
                            }
                        ],
                        actions: [
                            {
                                "class": "Provide",
                                "type": "Provide",
                                "identifier": "a5",
                                "actedBy": "http://mpeg.org/Publisher",
                                "actedOver": [
                                "http://mpeg.org/Song"
                                ]
                            },
                        ],
                        ipObjects: [],
                        signedBy: ['Creator'],
                        requiredSignatures: ['Creator', 'Streaming Service'],
                        status: 'Pending',
                        created: oldDate
                    },
                    {
                        versionNumber : 1,
                        parties: [
                            {
                                class: 'Creator',
                                role: 'Creator',
                                identifier: 'creatorId',
                                address: 'New address',
                                metadata: {
                                    "rdfs:label": 'Name Surname'
                                },
                                deonticsIssued: ['p4'],
                                actionsIsSubject: [],
                            },
                            {
                                class: 'Distributor',
                                role: 'Distributor',
                                identifier: 'distributorId',
                                metadata: {
                                    "rdfs:label": 'Name Surname (Dist)'
                                },
                                deonticsIssued: ['p4', 'o1'],
                                actionsIsSubject: ['a5'],
                            },
                            {
                                class: 'Distributor',
                                role: 'Distributor',
                                identifier: 'streamingServiceId',
                                metadata: {
                                    "rdfs:label": 'Streaming Service'
                                },
                                deonticsIssued: ['o4', 'o5', 'o6', 'o7', 'o8', 'o9', 'p1'],
                                actionsIsSubject: ['a2', 'p2', 'p3', 'p4'],
                            },
                            {
                                class: 'EndUser',
                                role: 'EndUser',
                                identifier: 'endUserId',
                                metadata: {
                                    "rdfs:label": 'Consumer'
                                },
                                deonticsIssued: ['o3'],
                                actionsIsSubject: ['a1', 'p1'],
                            }
                        ],
                        deontics: [
                            {
                                class: "Obligation",
                                type: "Obligation",
                                identifier: "o4",
                                metadata: {
                                "rdfs:label": "Streaming service pays 10% to publisher"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/StreamingService",
                                act: "http://mpeg.org/pay2",
                                actedBySubject: "http://mpeg.org/StreamingService"
                            },
                            {
                                class: "Obligation",
                                type: "Obligation",
                                identifier: "o5",
                                metadata: {
                                "rdfs:label": "Streaming service pays 1% to PRO"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/StreamingService",
                                act: "http://mpeg.org/pay3",
                                actedBySubject: "http://mpeg.org/StreamingService"
                            },
                            {
                                class: "MCOPermission",
                                type: "MCOPermission",
                                identifier: "p4",
                                metadata: {
                                "rdfs:label": "Author authorises indie label to distribute"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/Author",
                                act: "http://mpeg.org/action4",
                                actedBySubject: "http://mpeg.org/RecordLabel",
                                actObjects: [
                                "http://mpeg.org/Song"
                                ]
                            },
                            {
                                class: "Obligation",
                                type: "Obligation",
                                identifier: "o1",
                                metadata: {
                                "rdfs:label": "Publisher provide a song to streaming"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/Publisher",
                                act: "http://mpeg.org/action5",
                                actedBySubject: "http://mpeg.org/Publisher",
                                actObjects: [
                                "http://mpeg.org/Song"
                                ]
                            }
                        ],
                        actions: [],
                        ipObjects: [
                            {
                                class: 'Work',
                                type: 'Work',
                                identifier: 'songId',
                                metadata: {
                                    "rdfs:label": 'Frantic by Metallica'
                                },
                            }
                        ],
                        signedBy: ['Creator'],
                        requiredSignatures: ['Creator', 'Streaming Service'],
                        status: 'Pending',
                        created: currentDate
                    }
                ]
            };
            this.localContracts.push(newContract);
            this.versionCount++;
        },
    }
})