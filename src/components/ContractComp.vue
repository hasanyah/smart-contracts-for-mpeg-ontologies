<script setup lang="ts">
import { ref } from 'vue'
import FormSectionComp from "../components/FormSectionComp.vue"
import { useContractStore } from '../stores/contract';
import _ from 'lodash'
import { computed } from '@vue/reactivity';

const props = defineProps({
    data: Object,
    contractName: String,
    mainVersionNumber: Number
})
const dataToView = computed(()=>contractStore.getComparableMergedData(props.contractName, props.mainVersionNumber, props.data.versionNumber));

const contractStore = useContractStore();
const getComparableMergedData = contractStore.getComparableMergedData;
</script>

<template>
<h1 class="text-center">Contract: {{ contractName }}</h1>
<h3 class="text-center">Version: {{ data.versionNumber }}</h3>
    <div class="col-lg-9">
        <FormSectionComp :contractName="contractName" :versionNumber="data.versionNumber" :mainVersionNumber="mainVersionNumber" title="Parties" objtype='Party' v-if="dataToView.parties.length > 0" :data="dataToView.parties"/>
        <FormSectionComp :contractName="contractName" :versionNumber="data.versionNumber" :mainVersionNumber="mainVersionNumber" title="Intellectual Property" objtype='Work' v-if="dataToView.ipObjects.length > 0" :data="dataToView.ipObjects"/>
    </div>
</template>
