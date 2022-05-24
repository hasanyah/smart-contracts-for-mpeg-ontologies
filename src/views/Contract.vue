<script setup lang="ts">
import { ref } from "vue";
import { useContractStore } from "../stores/contract";
import { Contract } from "../types/ContractTypes.interface";
import { storeToRefs } from "pinia";

const contractStore = useContractStore();
const { selectedContract } = storeToRefs(useContractStore());
const contractToView = ref<Contract>();
const getContractByName = contractStore.getContractByName;
contractToView.value = getContractByName(selectedContract.value);
</script>

<template>
    <h1 class="text-center">Contract: {{ contractToView.name }}</h1>
    <div class="m-5">
        <FormSectionComp title="Parties"/>
        <FormSectionComp title="Objects"/>
    </div>
</template>