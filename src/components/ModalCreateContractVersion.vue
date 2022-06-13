<script setup lang="ts">
import { useContractStore } from "../stores/contract";
import { storeToRefs } from "pinia";

const props = defineProps({
    contractName: String
})

const contractStore = useContractStore();
const { versionUnderEdit } = storeToRefs(useContractStore())

function addParty() {
    contractStore.addParty()
}

function addIPO() {
    contractStore.addIPO()
}
</script>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
library.add(faCirclePlus)
</script>


<template>
    <div class="modal fade" id="ContractVersionCreator" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">{{ contractName }} - New Version</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <h3>Parties</h3>
                        <button type="button" class="btn btn-labeled" @click="addParty">
                            <span class="btn-label"><font-awesome-icon :icon="['fas', 'circle-plus']" /></span>
                        </button>
                        <p v-for="party in versionUnderEdit.parties" :key="party.identifier">{{ party.metadata["rdfs:label"] }}</p>
                    </div>
                    <div>
                        <h3>Intellectual Properties</h3>
                        <p v-for="ipo in versionUnderEdit.ipObjects" :key="ipo.identifier">{{ ipo.metadata["rdfs:label"] }}</p>
                        <button type="button" class="btn btn-labeled" @click="addIPO">
                            <span class="btn-label"><font-awesome-icon :icon="['fas', 'circle-plus']" /></span>
                        </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>