<script setup lang="ts">
import ContractComp from './ContractComp.vue';
const props = defineProps({
    data: Object,
    comparedData: Object,
    contractName: String
})
</script>

<template>
    <div class="modal fade" id="ContractVersionComparator" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Version Comparison</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ContractComp v-if="data" :data="data" :comparedData="comparedData" :contractName="contractName"/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>