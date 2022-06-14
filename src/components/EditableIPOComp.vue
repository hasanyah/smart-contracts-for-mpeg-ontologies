<script setup lang="ts">

const props = defineProps({
    data: Object
})
</script>

<template>
<p>{{ data.metadata["rdfs:label"] }}</p>
</template> 