<script setup>
const props = defineProps({
        data: Object
    })
</script>

<template>
<h4>{{ data.metadata["rdfs:label"] }} - {{ data.class }}</h4>
</template>