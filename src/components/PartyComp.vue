<script setup>
import { storeToRefs } from 'pinia'
import { useContractStore } from '../stores/contract'
const props = defineProps({
        data: Object
    })
const { parties } = storeToRefs(useContractStore())
</script>

<template>
<div>
    <div class="row">
        <div class="col">
            Role: {{ data.class }}
        </div>
        <div class="col">
            Address: 
            <span v-if="data.address">{{ data.address }}</span>
            <span v-else><em>N/A</em></span>
        </div>
    </div>
    <span v-if="data.deonticsIssued && data.deonticsIssued.length > 0">
        <p><strong>Deontics Issued: </strong></p>
        <ul>
            <li v-for="item in data.deonticsIssued" :key="item">
                {{item}}
            </li>
        </ul>
    </span>
    <span v-if="data.actionsIsSubject && data.actionsIsSubject.length > 0">
        <p><strong>Subject to following actions: </strong></p>
        <ul>
            <li v-for="item in data.actionsIsSubject" :key="item">
                {{item}}
            </li>
        </ul>
    </span>
</div>
</template>