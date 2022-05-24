<script setup lang="ts">

import { ref } from 'vue'
import { useUserStore } from '../stores/user';
import { storeToRefs } from "pinia";
import { useContractStore } from '../stores/contract';
import { Contract } from '../types/ContractTypes.interface'

const tableHeaders = ['Name', 'Status', 'Created', 'Last Edited', 'Creator']
const { loggedInUser } = storeToRefs(useUserStore())
const contractStore = useContractStore();    
const { getContractsBelongingToTheUser } = storeToRefs(useContractStore());
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
                parties: [],
                deontics: [],
                actions: [],
                ipObjects: [],
                signedBy: [],
                status: 'Pending',
                created: oldDate()
            },
            {
                versionNumber : 1,
                parties: [],
                deontics: [],
                actions: [],
                ipObjects: [],
                signedBy: [],
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
                <td>{{ contract.name }}</td>
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