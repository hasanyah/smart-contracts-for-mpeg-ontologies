<script setup lang="ts">
import FormSectionCardComp from "../components/FormSectionCardComp.vue"

const props = defineProps({
    data: Object,
    comparedData: Object,
    objtype: String,
    requiresComparison: Boolean,
    addedOrRemoved: String
})

function getClassModifier() {
    if (!props.requiresComparison)
        return ""
    if (!props.addedOrRemoved)
        return ""

    else if (props.addedOrRemoved === "added")
        return "border border-success border-3"
    else if (props.addedOrRemoved === "removed")
        return "border border-danger border-3"
    else
        return "border border-info border-3"
}

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
        <FormSectionCardComp 
            :class="getClassModifier()"
            :data="data" 
            :comparedData="comparedData" 
            :objtype="objtype"/>
    </div>
</div>
</template>