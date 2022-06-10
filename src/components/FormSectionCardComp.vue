<script setup lang="ts">
const props = defineProps({
    data: Object,
    comparedData: Object,
    objtype: String,
    propagateChanges: Boolean,
    propagatedAdditionalData: Object
})
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
    <component 
        :is="objtype+'Comp'" 
        :data="data" 
        :comparedData="comparedData" 
        :changesArePropagated="propagateChanges"
        :propagatedAdditionalData="propagatedAdditionalData"/>
</div>
</template>