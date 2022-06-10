<script setup lang="ts">
const props = defineProps({
    viewedText: String,
    comparedText: String,
    title: String
})

function appendClass() {
    if (props.viewedText === props.comparedText)
        return "";
    else if (props.viewedText === undefined)
        return "border border-success border-3";
    else if (props.comparedText === undefined)
        return "border border-danger border-3";
    else
        return "border border-warning border-3";
}
</script>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
library.add(faCircleInfo)
</script>

<template>
<div :class="appendClass()">
    <span v-if="title">{{ title }} : </span>
    
    <span v-if="comparedText">{{ comparedText }}</span>
    <span v-else><em>N/A</em></span>

    <span v-if="viewedText !== comparedText"> 
        <font-awesome-icon data-bs-toggle="tooltip" data-bs-placement="top" :title="'changed from: ' + viewedText" :icon="['fas', 'circle-info']" />
    </span>
</div>
</template> 
