<script setup lang="ts">
import { useContractStore } from "../stores/contract";
import { storeToRefs } from "pinia";
import EPC from "./EditablePartyComp.vue";
import EIC from "./EditableIPOComp.vue";

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

function deleteParty(partyId: string) {
    contractStore.deleteParty(partyId)
}

function deleteIPO(ipoId: string) {
    console.log("delete"+ipoId)
}

function updateParty(partyId: string) {
    console.log("update"+partyId)
}

function updateIPO(ipoId: string) {
    console.log("update"+ipoId)
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
                        <EPC v-for="party in versionUnderEdit.parties" :key="party.identifier" 
                            :data="party" 
                            :deontics="versionUnderEdit.deontics"
                            :actions="versionUnderEdit.actions"
                            @party-deleted="deleteParty"
                            @party-updated="updateParty"/>
                    </div>
                    <div>
                        <h3>Intellectual Properties</h3>
                        <EIC v-for="ipo in versionUnderEdit.ipObjects" :key="ipo.identifier" 
                            :data="ipo"
                            :deontics="versionUnderEdit.deontics"
                            :actions="versionUnderEdit.actions"
                            @ipo-deleted="deleteIPO"
                            @ipo-updated="updateIPO" />
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