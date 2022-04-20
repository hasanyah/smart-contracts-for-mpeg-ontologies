<script setup>
const props = defineProps({
        title: String,
        type: String
    })
</script>

<template>
<component :is="type" :title="title"/>
</template>