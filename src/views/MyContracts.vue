<script setup lang="ts">

import { ref } from 'vue'
import { useUserStore } from '../stores/user';
import { storeToRefs } from "pinia";
import { useContractStore } from '../stores/contract';
import { Contract } from '../types/ContractTypes.interface';

const tableHeaders = ['Name', 'Status', 'Created', 'Last Edited', 'Creator']
const { loggedInUser } = storeToRefs(useUserStore())
const contractStore = useContractStore();    
const { getContractsBelongingToTheUser, selectedContract } = storeToRefs(useContractStore());
const count = ref<number>(0);

const getCreatedDate = contractStore.getCreatedDate; 
const getLastModifiedDate = contractStore.getLastModifiedDate; 

function currentDate() {
    return new Date;
}

function oldDate() {
    let d = new Date;
    d.setDate(d.getDate()-10);
    return d;
}

function createItem() {
    let mContract = {
        name: 'mContract'+count.value,
        creator: loggedInUser.value,
        versions : [
            {
                versionNumber : 0,
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
                    }
                ],
                deontics: [],
                actions: [],
                ipObjects: [],
                signedBy: ['Creator'],
                requiredSignatures: ['Creator', 'Streaming Service'],
                status: 'Pending',
                created: oldDate()
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
                deontics: [],
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
                created: currentDate()
            }
        ]
    }
    contractStore.createNewContract(mContract);
    count.value++;
}

function deleteContract(name: string) {
    contractStore.deleteContract(name)
}

function setSelectedContract(name: string) {
    contractStore.setSelectedContract(name)
}

</script>

<template>
    <div>My Contracts</div>

    <table class="table table-striped">
        <thead>
            <th  v-for="header in tableHeaders" :key='header'>{{ header }}</th>
            <th/>
        </thead>
        <tbody>
            <tr v-for="contract in getContractsBelongingToTheUser" :key='contract.name'>
                <td><RouterLink :to="`/contract/${contract.name}`" @click="setSelectedContract(contract.name)">{{ contract.name }}</RouterLink></td>
                <td>{{ contract.versions[0].status }}</td>
                <td>{{ getCreatedDate(contract.name) }}</td>
                <td>{{ getLastModifiedDate(contract.name) }}</td>
                <td>{{ contract.creator }}</td>
                <td><button @click="deleteContract(contract.name)">Delete</button></td>
            </tr>
        </tbody>
    </table>
    <button @click="createItem">New Item</button>
</template>