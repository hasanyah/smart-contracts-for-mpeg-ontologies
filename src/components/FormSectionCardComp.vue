<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
    data: Object,
    objtype: String,
    contractName: String,
    versionNumber: Number,
    mainVersionNumber: Number
})

const matcher = {
    "unchanged" : "",
    "added"     : "border-success border-5",
    "removed"   : "border-danger border-5",
    "modified"  : "border-warning  border-5"
}

const propagateFurtherChanges = ref<Boolean>();
propagateFurtherChanges.value = false;

function appendClass() {
    if (props.mainVersionNumber === props.versionNumber) {
        propagateFurtherChanges.value = false
        return ""
    } else {
        if (props.data.modifiedState === "modified")
            propagateFurtherChanges.value = true

        return matcher[props.data.modifiedState];
    }
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
    <component :is="objtype+'Comp'" :data="data" :changesArePropagated="propagateFurtherChanges" :contractName="contractName" :versionNumber="versionNumber" :mainVersionNumber="mainVersionNumber" />
</div>
</template>