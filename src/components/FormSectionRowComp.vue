<script setup lang="ts">
import FormSectionCardComp from "../components/FormSectionCardComp.vue"
const props = defineProps({
    data: Object,
    objtype: String,
    contractName: String,
    versionNumber: Number,
    mainVersionNumber: Number
})
</script>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
library.add(faCircleInfo)
</script>

<template>
<div class="row">
    <div class="col-lg-4">
        <p><span>
                <font-awesome-icon data-bs-toggle="tooltip" data-bs-placement="top" :title="data.identifier" :icon="['fas', 'circle-info']" />
            </span> 
            {{ data.metadata["rdfs:label"] }}
        </p>

    </div>
    <div class="col-lg-8">
        <FormSectionCardComp :contractName="contractName" :versionNumber="versionNumber" :mainVersionNumber="mainVersionNumber" :data="data" :objtype="objtype"/>
    </div>
</div>
</template>