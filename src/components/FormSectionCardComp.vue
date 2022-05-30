<script setup lang="ts">
const props = defineProps({
    data: Object,
    objtype: String,
    contractName: String,
    versionNumber: Number,
    mainVersionNumber: Number
})

const matcher = {
    "unchanged" : "",
    "added"     : "bg-success",
    "removed"   : "bg-danger",
    "modified"  : "bg-warning"
}

function appendClass() {
    if (props.mainVersionNumber === props.versionNumber)
        return ""
    else
        return matcher[props.data.modifiedState];
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
<div class="container-fluid mb-4 justify-content-md-center border border-secondary rounded" :class="appendClass()">
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