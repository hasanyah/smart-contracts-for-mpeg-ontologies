<script setup lang="ts">
import { ref } from 'vue';
import { useContractStore } from '../stores/contract'
import { Party } from '../types/ContractTypes.interface';
import Field from './FomSectionCardFieldComp.vue'

const props = defineProps({
    data: Object,
    changesArePropagated: Boolean
})

const contractStore = useContractStore();
const getDeonticByName = contractStore.getDeonticByName;
const newParty = ref<Party>();

// if (props.changesArePropagated)
//     newParty.value = contractStore.getPartyFromVersion(props.contractName, props.mainVersionNumber, props.data.identifier);

</script>

<template>
<div>
    <div class="row">
        <div class="col">
            <Field :newText="changesArePropagated && newParty ? newParty.class : data.class" :oldText="data.class" title="Role"/>
        </div>
        <div class="col">
            <Field :newText="changesArePropagated && newParty? newParty.address : data.address" :oldText="data.address" title="Address"/>
        </div>
    </div>
    <span v-if="data.deonticsIssued && data.deonticsIssued.length > 0">
        <p><strong>Deontics Issued: </strong></p>
        <ul>
            <li v-for="item in data.deonticsIssued" :key="item">
                <!-- {{getDeonticByName(item)}} -->
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