import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { Contract, Version, VersionSummary, Party, IPObject } from '../types/ContractTypes.interface'
import { versions } from 'process'
import { faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons'

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

export const useContractStore = defineStore({
    id: 'contract',
    state: () => ({
        localContracts: [],
        selectedContract: '',
        selectedVersion: -1,
        comparedVersionNumber: 0,
        versionCount: 0
    }),
    getters: {
        getCreatedDate: (state) => {
            return (contractName: string): string => {
                let contract = state.localContracts.find((contract) => contract.name === contractName);
                return new Date(contract.versions.at(0).created).toLocaleDateString("es-ES"); 
            }
        },
        getLastModifiedDate: (state) => {
            return (contractName: string): string => {
                let contract = state.localContracts.find((contract) => contract.name === contractName);
                return new Date(contract.versions.at(-1).created).toLocaleDateString("es-ES");
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
                versions.push({date: element.created, versionNumber: element.versionNumber});
            });

            return versions;
        },
        getComparedVersion: (state) => {
            return (versionNumber: number): Version => {
                let version = state.localContracts.find((contract) => contract.name === state.selectedContract)
                               .versions.find((version) => version.versionNumber === versionNumber);
                return version;
            }
        },
        getDeonticByName: (state) => {
            return (deonticName: string): string => {
                let contract = state.localContracts.find((contract) => contract.name === state.selectedContract);
                let version = state.selectedVersion === -1 ? contract.versions.at(-1) : contract.versions.find((version) => version.versionNumber === state.selectedVersion);
                let deontic = version.deontics.find((deontic) => deontic.identifier === deonticName);
                if (deontic)
                    return deontic.metadata["rdfs:label"];
                else
                return deonticName;
                                
            }
        },
        getComparableMergedData: (state) => {
            return (
                    contractName: string, 
                    newVersionName: number, 
                    oldVersionName: number
                ): Version => {
                let mergedComparableVersion: Version = {}
                mergedComparableVersion.parties = []
                let contract = state.localContracts.find((contract) => contract.name === contractName);
                let newVersion = contract.versions.find((version) => version.versionNumber === newVersionName);
                let oldVersion = contract.versions.find((version) => version.versionNumber === oldVersionName);

                newVersion.parties.forEach((party) => {
                    let partyInNewVersion = newVersion.parties.find((p) => { return p.identifier == party.identifier });
                    let partyInOldVersion = oldVersion.parties.find((p) => { return p.identifier == party.identifier });

                    let modifiedState = ""
                    if (!partyInOldVersion)
                        modifiedState = "added"
                    else if (isPartyEqual(partyInNewVersion, partyInOldVersion))
                        modifiedState = "unchanged"
                    else
                        modifiedState = "modified"

                    party.modifiedState = modifiedState
                    mergedComparableVersion.parties.push(party)
                });

                oldVersion.parties.forEach((party) => {
                    let partyInNewVersion = newVersion.parties.find((p) => { return p.identifier == party.identifier });
                    let partyInOldVersion = oldVersion.parties.find((p) => { return p.identifier == party.identifier });
                    let modifiedState = ""
                    if (!partyInNewVersion) {
                        modifiedState = "removed"
                        party.modifiedState = modifiedState
                        mergedComparableVersion.parties.push(party)
                    }
                });
                mergedComparableVersion.ipObjects = []
                newVersion.ipObjects.forEach((ipObject) => {
                    mergedComparableVersion.ipObjects.push(ipObject)
                });


                return mergedComparableVersion;
            }
        }
    },
    actions: {
        setSelectedContract(name: string) {
            this.selectedContract = name;
        },
        setSelectedVersion(num: number) {
            this.selectedVersion = num;
        },
        setComparedVersionNumber(num: number) {
            this.comparedVersionNumber = num;
        },
        deleteContract(name: string) {
            this.localContracts = this.localContracts.filter((contract) => {
                return contract.name !== name;
            });
        },
        addParty(party: Party) {
            let contract = this.localContracts.find((contract) => contract.name === this.selectedContract);
            contract.versions.at(-1).parties.push(party)
        },
        addIPObject(ipObject: IPObject) {
            let contract = this.localContracts.find((contract) => contract.name === this.selectedContract);
            contract.versions.at(-1).ipObjects.push(ipObject)
        },
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
                        actions: [],
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
        },
    }
})