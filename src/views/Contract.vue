<script setup lang="ts">
import { ref } from "vue";
import { useContractStore } from "../stores/contract";
import { Contract, Version, VersionSummary } from "../types/ContractTypes.interface";
import { storeToRefs } from "pinia";

const contractStore = useContractStore();
const { selectedContract } = storeToRefs(useContractStore());
const contractToView = ref<Contract>();
const getContractByName = contractStore.getContractByName;
contractToView.value = getContractByName(selectedContract.value);

const versions = ref<VersionSummary[]>()
const getVersionHistory = contractStore.getVersionListByContractName;
versions.value = getVersionHistory;
const lastVersionToView = ref<Version>()

</script>

<template>
    <h1 class="text-center">Contract: {{ contractToView.name }}</h1>
    <div class="m-5">
        <FormSectionComp title="Parties"/>
        <FormSectionComp title="Objects"/>
    </div>
    <div class="m-5">
        <h3>Version History</h3>
        <ul>
            <li v-for="version in versions" :key="version">
                Version: {{ version.versionNumber }} - {{ version.date }}
            </li>
        </ul>
    </div>
</template>