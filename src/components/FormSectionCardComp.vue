<script setup lang="ts">
import { useContractStore } from '../stores/contract';

const props = defineProps({
    data: Object,
    objtype: String,
    compared: Boolean,
    partyModificationStatus: String,
    contractName: String,
    versionNumber: Number,
    mainVersionNumber: Number
})

const contractStore = useContractStore();
const isPartyNewOrModified = contractStore.isPartyNewOrModified;
const matcher = {
    "unchanged" : "",
    "added"     : "bg-success",
    "removed"   : "bg-danger",
    "modified"  : "bg-warning"
}


</script>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
library.add(faPen)
library.add(faXmark)
</script>

<template>
<div class="container-fluid mb-4 justify-content-md-center border border-secondary rounded">
    <div class="d-flex justify-content-end">
        <button type="button" class="btn">
            <span class="btn-label"><font-awesome-icon :icon="['fas', 'pen']" /></span>
        </button>
        <button type="button" class="btn" >
            <span class="btn-label"><font-awesome-icon :icon="['fas', 'xmark']" /></span>
        </button>
    </div>
    <div></div>
    <component :is="objtype+'Comp'" :data="data" :contractName="contractName" :versionNumber="versionNumber" :mainVersionNumber="mainVersionNumber" />
</div>
</template>