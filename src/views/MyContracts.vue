<script setup lang="ts">
import { ref } from 'vue'
import { useContractStore } from '../stores/contract';
import { Contract, Version } from '../types/ContractTypes.interface'
import { storeToRefs } from "pinia";

const tableHeaders = ['Name', 'Status', 'Created', 'Last Edited']
const contractStore = useContractStore();    
const { contracts } = storeToRefs(contractStore);
const count = ref<number>(0);

function currentDate() {
    return new Date;
}

function createItem() {
    console.log("clicked")
    let mContract = {
        name: 'mContract'+count.value,
        versions : [
            {
                versionNumber : count.value,
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

function appendContract(id: number) {
    console.log("clicked"+id)
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
            <tr v-for="contract, i in contracts" :key='i'>
                <td>{{ contract.name }}</td>
                <td>{{ contract.versions[0].status }}</td>
                <td>{{ contract.versions[0].created }}</td>
                <td>{{ contract.versions[0].created }}</td>
                <td><button @click="appendContract(i)">Append</button></td>
            </tr>
        </tbody>
    </table>
    <button @click="createItem">New Item</button>
</template>