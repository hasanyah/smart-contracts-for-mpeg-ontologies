<script setup lang="ts">
import Field from './FomSectionCardFieldComp.vue'

const props = defineProps({
    data: Object,
    comparedData: Object,
    changesArePropagated: Boolean
})

// if (props.changesArePropagated)
//     newParty.value = contractStore.getPartyFromVersion(props.contractName, props.mainVersionNumber, props.data.identifier);

</script>

<template>
<div>
    <Field :newText="changesArePropagated ? comparedData.metadata['rdfs:label'] : data.metadata['rdfs:label']" :oldText="data.metadata['rdfs:label']" title="Name"/>
    <Field :newText="changesArePropagated ? comparedData.class : data.class" :oldText="data.class" title="Role"/>
    <Field :newText="changesArePropagated ? comparedData.address: data.address" :oldText="data.address" title="Address"/>
    <span v-if="data.deonticsIssued && data.deonticsIssued.length > 0">
        <p><strong>Deontics Issued: </strong></p>
        <ul>
            <li v-for="item in data.deonticsIssued" :key="item">
                <!-- {{getDeonticByName(item)}} -->
            </li>
        </ul>
    </span>
    <span v-if="data.actionsIsSubject && data.actionsIsSubject.length > 0">
        <p><strong>Subject to following actions: </strong></p>
        <ul>
            <li v-for="item in data.actionsIsSubject" :key="item">
                {{item}}
            </li>
        </ul>
    </span>
</div>
</template>