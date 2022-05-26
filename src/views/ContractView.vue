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
    <div class="row">
        <div class="col-lg-9">
            <FormSectionComp title="Parties" type='Party' :data="contractToView.versions.at(-1).parties"/>
            <FormSectionComp title="Intellectual Property" type='Work' :data="contractToView.versions.at(-1).ipObjects"/>
        </div>
        <div class="col-lg-3">
            <div>
                <h3>Royalties Distribution</h3>
                data graphs
            </div>
            <div>
                <h3>Version History</h3>
                <ul>
                    <li v-for="version in versions" :key="version">
                        Version: {{ version.versionNumber }}
                        <br/>
                        {{ version.date }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>