<script setup lang="ts">
const props = defineProps({
        data: Object
    })
</script>

<template>
<h1 class="text-center">Contract: {{ data.name }}</h1>
    <div class="col-lg-9">
        <FormSectionComp title="Parties" objtype='Party' :data="data.parties"/>
        <FormSectionComp title="Intellectual Property" objtype='Work' :data="data.ipObjects"/>
    </div>
</template>
