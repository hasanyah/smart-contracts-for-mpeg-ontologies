<script setup>
import Party from "./PartyComp.vue"

components: {
    Party
}
const parties = [
    "PerformingRighthsOrganisation",
    "Aggregator",
    "Author",
    "Publisher",
    "MechanicalLicenseAgent",
    "RecordLabel",
    "StreamingService",
    "Consumer"
]
</script>

<template>
<h1>Contract</h1>

<h2>Parties</h2>
<ul>
    <li v-for="party in parties" v-bind:key="party">
        <Party :title="party" />

</li>
</ul>
</template>