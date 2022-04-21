<script setup>
const props = defineProps({
        data: Object
    })
</script>

<template>
<h4>{{ data.class }} - {{ data.metadata["rdfs:label"] }}</h4>
</template>