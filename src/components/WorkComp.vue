<script setup lang="ts">
const props = defineProps({
    data: Object,
    contractName: String,
    versionNumber: Number,
    mainVersionNumber: Number
})
</script>

<template>
<div>
    <div class="row">
        <div class="col">
            Type: {{ data.class }}
        </div>
    </div>
</div>
</template>