<script setup lang="ts">
import Field from './FomSectionCardFieldComp.vue'
const props = defineProps({
    data: Object,
    comparedData: Object,
    changesArePropagated: Boolean,
    propagatedAdditionalData: Object,
    recentlyAdded: Boolean
})
</script>

<template>
<div>
    <Field :comparedText="changesArePropagated ? comparedData.metadata['rdfs:label'] : data.metadata['rdfs:label']" :viewedText="data.metadata['rdfs:label']" title="Name"/>
    <Field :comparedText="changesArePropagated ? comparedData.type : data.type" :viewedText="data.type" title="Type"/>
</div>
</template>