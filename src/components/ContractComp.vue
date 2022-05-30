<script setup lang="ts">
const props = defineProps({
        data: Object,
        contractName: String
    })
</script>

<template>
<h1 class="text-center">Contract: {{ contractName }}</h1>
<h2 class="text-center">Version: {{ data.versionNumber }}</h2>
    <div class="col-lg-9">
        <FormSectionComp title="Parties" objtype='Party' v-if="data.parties.length > 0" :data="data.parties"/>
        <FormSectionComp title="Intellectual Property" objtype='Work' v-if="data.ipObjects.length > 0" :data="data.ipObjects"/>
    </div>
</template>
