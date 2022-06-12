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
    let version;
    if (versionNumber === -1)
        version = contract.versions.at(-1);
    else
        version = contract.versions.find((version) => version.versionNumber === versionNumber);
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
            let loggedInUser = userStore.loggedInUser
            let contracts = this.localContracts.filter((contract) => {
                return contract.creator === loggedInUser || contract.versions.at(-1).requiredSignatures.includes(loggedInUser);
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
                                class: 'Creator',
                                role: 'Creator',
                                identifier: 'removedCreatorId',
                                address: 'Removed Creator Address',
                                metadata: {
                                    "rdfs:label": 'This creator is removed in the new version'
                                },
                                deonticsIssued: ['p4'],
                                actionsIsSubject: ['a5'],
                            },
                            {
                                class: 'Creator',
                                role: 'Creator',
                                identifier: 'unchangedCreatorId',
                                address: 'Unchanged creator address',
                                metadata: {
                                    "rdfs:label": 'Unchanged Creator'
                                },
                                deonticsIssued: ['p4'],
                                actionsIsSubject: ['a5'],
                            },
                            {
                                class: 'Distributor',
                                role: 'Distributor',
                                identifier: 'streamingServiceId',
                                metadata: {
                                    "rdfs:label": 'Unchanged Streaming Service'
                                },
                                deonticsIssued: ['o4', 'o5', 'o6', 'o7', 'o8', 'p1'],
                                actionsIsSubject: ['a2'],
                            },
                            {
                                class: 'Distributor',
                                role: 'Distributor',
                                identifier: 'secondStreamingServiceId',
                                metadata: {
                                    "rdfs:label": 'Changed Streaming Service with old text'
                                },
                                deonticsIssued: ['o7', 'o8', 'o9', 'p1'],
                                actionsIsSubject: ['a2'],
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
                                class: "Obligation",
                                type: "Obligation",
                                identifier: "o6",
                                metadata: {
                                    "rdfs:label": "Streaming service must pay 50% to Aggregator"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/StreamingService",
                                act: "http://mpeg.org/pay4",
                                actedBySubject: "http://mpeg.org/StreamingService"
                            },
                            {
                                class: "Obligation",
                                type: "Obligation",
                                identifier: "o7",
                                metadata: {
                                    "rdfs:label": "Aggregator must pay 85% to Record Label"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/StreamingService",
                                act: "http://mpeg.org/pay5",
                                actedBySubject: "http://mpeg.org/Aggregator"
                            },
                            {
                                class: "Obligation",
                                type: "Obligation",
                                identifier: "o8",
                                metadata: {
                                    "rdfs:label": "Indie label must pay 10-50% to Author"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/StreamingService",
                                act: "http://mpeg.org/pay6",
                                actedBySubject: "http://mpeg.org/RecordLabel"
                            },
                            {
                                class: "Obligation",
                                type: "Obligation",
                                identifier: "o9",
                                metadata: {
                                    "rdfs:label": "Mechanical License Agent must pay to Publisher"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/StreamingService",
                                act: "http://mpeg.org/pay7",
                                actedBySubject: "http://mpeg.org/MechanicalLicenseAgent"
                            },
                            {
                                class: "MCOPermission",
                                type: "MCOPermission",
                                identifier: "p1",
                                metadata: {
                                    "rdfs:label": "Consumer can play a song"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/StreamingService",
                                act: "http://mpeg.org/action1",
                                actedBySubject: "http://mpeg.org/Consumer",
                                actObjects: [
                                    "http://mpeg.org/Song"
                                ]
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
                            }
                        ],
                        actions: [
                            {
                                class: "Provide",
                                type: "Provide",
                                identifier: "a2",
                                actedBy: "http://mpeg.org/Publisher",
                                actedOver: [
                                "http://mpeg.org/Song"
                                ]
                            },
                            {
                                class: "Provide",
                                type: "Provide",
                                identifier: "a5",
                                actedBy: "http://mpeg.org/Publisher",
                                actedOver: [
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
                                identifier: 'unchangedCreatorId',
                                address: 'Unchanged creator address',
                                metadata: {
                                    "rdfs:label": 'Unchanged Creator'
                                },
                                deonticsIssued: ['p4'],
                                actionsIsSubject: ['a5'],
                            },
                            {
                                class: 'Distributor',
                                role: 'Distributor',
                                identifier: 'streamingServiceId',
                                metadata: {
                                    "rdfs:label": 'Unchanged Streaming Service'
                                },
                                deonticsIssued: ['o4', 'o5', 'o6', 'o7', 'o8', 'o9', 'p1'],
                                actionsIsSubject: ['a2'],
                            },
                            {
                                class: 'Creator',
                                role: 'Creator',
                                identifier: 'addedCreatorId',
                                address: 'Added creator address',
                                metadata: {
                                    "rdfs:label": 'Added Creator'
                                },
                                deonticsIssued: ['p4'],
                                actionsIsSubject: ['a5'],
                            },
                            {
                                class: 'Distributor',
                                role: 'Distributor',
                                identifier: 'secondStreamingServiceId',
                                metadata: {
                                    "rdfs:label": 'Changed Streaming Service with new text'
                                },
                                deonticsIssued: ['o5', 'o6', 'o9', 'p1'],
                                actionsIsSubject: ['a2'],
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
                                class: "Obligation",
                                type: "Obligation",
                                identifier: "o6",
                                metadata: {
                                    "rdfs:label": "Streaming service must pay 50% to Aggregator"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/StreamingService",
                                act: "http://mpeg.org/pay4",
                                actedBySubject: "http://mpeg.org/StreamingService"
                            },
                            {
                                class: "Obligation",
                                type: "Obligation",
                                identifier: "o7",
                                metadata: {
                                    "rdfs:label": "Aggregator must pay 85% to Record Label"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/StreamingService",
                                act: "http://mpeg.org/pay5",
                                actedBySubject: "http://mpeg.org/Aggregator"
                            },
                            {
                                class: "Obligation",
                                type: "Obligation",
                                identifier: "o8",
                                metadata: {
                                    "rdfs:label": "Indie label must pay 10-50% to Author"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/StreamingService",
                                act: "http://mpeg.org/pay6",
                                actedBySubject: "http://mpeg.org/RecordLabel"
                            },
                            {
                                class: "Obligation",
                                type: "Obligation",
                                identifier: "o9",
                                metadata: {
                                    "rdfs:label": "The text here has been changed"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/StreamingService",
                                act: "http://mpeg.org/pay7",
                                actedBySubject: "http://mpeg.org/MechanicalLicenseAgent"
                            },
                            {
                                class: "MCOPermission",
                                type: "MCOPermission",
                                identifier: "p1",
                                metadata: {
                                    "rdfs:label": "Consumer can play a song"
                                },
                                issuedIn: "http://mpeg.org/contract2",
                                issuer: "http://mpeg.org/StreamingService",
                                act: "http://mpeg.org/action1",
                                actedBySubject: "http://mpeg.org/Consumer",
                                actObjects: [
                                    "http://mpeg.org/Song"
                                ]
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
                            }
                        ],
                        actions: [
                            {
                                class: "Provide",
                                type: "Provide",
                                identifier: "a2",
                                actedBy: "http://mpeg.org/Publisher",
                                actedOver: [
                                "http://mpeg.org/Song"
                                ]
                            },
                            {
                                class: "Provide",
                                type: "Provide",
                                identifier: "a5",
                                actedBy: "http://mpeg.org/Publisher",
                                actedOver: [
                                "http://mpeg.org/Song"
                                ]
                            },
                        ],
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