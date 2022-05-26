<script setup lang="ts">
import { ref } from "vue";
import { useContractStore } from "../stores/contract";
import { Contract, Version, VersionSummary } from "../types/ContractTypes.interface";
import { storeToRefs } from "pinia";
import ModalContractVersionComparator from "../components/ModalContractVersionComparator.vue"

const contractStore = useContractStore();
const { selectedContract, comparedVersion } = storeToRefs(useContractStore());
const contractToView = ref<Contract>();
const getContractByName = contractStore.getContractByName;
contractToView.value = getContractByName(selectedContract.value);

const versions = ref<VersionSummary[]>()
const getVersionHistory = contractStore.getVersionListByContractName;
versions.value = getVersionHistory;
const lastVersionToView = ref<Version>()
const versionNumberToCompare = ref<string>("")

function setSelectedVersion(num: number) {
    contractStore.setSelectedVersion(num)
}

function setComparedVersion(num: number) {
    contractStore.setComparedVersion(num)
}

setSelectedVersion(-1)
</script>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
library.add(faCirclePlus)
</script>

<template>
    <h1 class="text-center">Contract: {{ contractToView.name }}</h1>
    <div class="row">
        <div class="col-lg-9">
            <FormSectionComp title="Parties" objtype='Party' :data="contractToView.versions.at(-1).parties"/>
            <FormSectionComp title="Intellectual Property" objtype='Work' :data="contractToView.versions.at(-1).ipObjects"/>
        </div>
        <div class="col-lg-3">
            <div>
                <h3>Royalties Distribution</h3>
                <div class="container-fluid mb-4 justify-content-md-center border border-secondary rounded">
                    data graphs
                </div>
            </div>
            <div>
                <h3>Version History</h3>
                <div class="container-fluid mb-4 justify-content-md-center border border-secondary rounded">
                    <ul>
                        <li v-for="version in versions" :key="version.versionNumber">
                            <button type="button" class="btn btn-labeled" data-bs-toggle="modal" data-bs-target="#VersionComparatorModal" @click="setComparedVersion(version.versionNumber)">
                                <span class="btn-label"><font-awesome-icon :icon="['fas', 'circle-plus']" /></span>
                            </button>
                            Version: {{ version.versionNumber }}
                            <br/>
                            {{ version.date }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <ModalContractVersionComparator id="VersionComparatorModal" :versionNumber="comparedVersion"/>
</template>