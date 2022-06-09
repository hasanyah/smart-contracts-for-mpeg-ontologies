<script setup lang="ts">
const props = defineProps({
    oldText: String,
    newText: String,
    title: String
})

function appendClass() {
    if (props.oldText === props.newText)
        return "";
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
    {{ title }} : 
    <span v-if="props.newText">{{ props.newText }}</span>
    <span v-else><em>N/A</em></span>
    
    <span v-if="props.oldText !== props.newText"> 
        <font-awesome-icon data-bs-toggle="tooltip" data-bs-placement="top" :title="'changed from: ' + props.oldText" :icon="['fas', 'circle-info']" />
    </span>
</div>
</template> 
