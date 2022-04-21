<script setup>
const props = defineProps({
        data: Object
    })
</script>

<template>
<component :is="data.class" :data="data"/>
</template>