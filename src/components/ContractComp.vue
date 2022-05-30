<script setup lang="ts">
import FormSectionComp from "../components/FormSectionComp.vue"
const props = defineProps({
    data: Object,
    contractName: String,
    mainVersionNumber: Number
})
</script>

<template>
<h1 class="text-center">Contract: {{ contractName }}</h1>
<h3 class="text-center">Version: {{ data.versionNumber }}</h3>
    <div class="col-lg-9">
        <FormSectionComp :contractName="contractName" :versionNumber="data.versionNumber" :mainVersionNumber="mainVersionNumber" title="Parties" objtype='Party' v-if="data.parties.length > 0" :data="data.parties"/>
        <FormSectionComp :contractName="contractName" :versionNumber="data.versionNumber" :mainVersionNumber="mainVersionNumber" title="Intellectual Property" objtype='Work' v-if="data.ipObjects.length > 0" :data="data.ipObjects"/>
    </div>
</template>
