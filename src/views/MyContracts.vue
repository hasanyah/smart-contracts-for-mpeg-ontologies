<script setup lang="ts">
import { ref } from 'vue'
import { useContractStore } from '../stores/contract';
import { Contract, Version } from '../types/ContractTypes.interface'
import { storeToRefs } from "pinia";

const tableHeaders = ['Name', 'Status', 'Created', 'Last Edited']
const contractStore = useContractStore();    
const { contracts } = storeToRefs(contractStore);
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
    console.log("clicked")
    let mContract = {
        name: 'mContract'+count.value,
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
    console.log("count: " + count.value)
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
            <tr v-for="contract in contracts" :key='contract.name'>
                <td>{{ contract.name }}</td>
                <td>{{ contract.versions[0].status }}</td>
                <td>{{ getCreatedDate(contract.name) }}</td>
                <td>{{ getLastModifiedDate(contract.name) }}</td>
                <td><button @click="deleteContract(contract.name)">Delete</button></td>
            </tr>
        </tbody>
    </table>
    <button @click="createItem">New Item</button>
</template>