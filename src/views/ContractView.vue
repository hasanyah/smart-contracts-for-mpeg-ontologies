<script setup lang="ts">
import { computed, ref } from "vue";
import { useContractStore } from "../stores/contract";
import { Contract, Version, VersionSummary } from "../types/ContractTypes.interface";
import { storeToRefs } from "pinia";
import ModalContractVersionComparator from "../components/ModalContractVersionComparator.vue"
import ContractComp from "../components/ContractComp.vue"
import {useRoute} from 'vue-router'

const route = useRoute();
const viewedContractId = route.params.contractid as string
const contractStore = useContractStore();
const contractToView = ref<Contract>();
contractToView.value = contractStore.getContractByName(viewedContractId);

const versions = ref<VersionSummary[]>()
versions.value = contractStore.getVersionListByContractName(viewedContractId);

const comparedVersionNumber = ref<number>(0)
const comparedVersion = ref<Version>()

function setComparedVersion(num: number) {
    if (num === -1)
        comparedVersion.value = contractToView.value.versions.at(-1);
    else
        comparedVersion.value = contractToView.value.versions.find((version) => version.versionNumber === num);
    
}
setComparedVersion(-1);
</script>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
library.add(faCirclePlus)
</script>

<template>
    <div class="row">
        <div class="col-lg-9">
            <ContractComp :data="contractToView.versions.at(-1)" :contractName="contractToView.name"/>
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
    <ModalContractVersionComparator id="VersionComparatorModal" :data="comparedVersion" :comparedData="contractToView.versions.at(-1)" :contractName="contractToView.name"/>
</template>