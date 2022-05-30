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

function createItem() {
    contractStore.createNewContract();
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