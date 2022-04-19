<script setup>
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

const deontics = [

]

const actions = [
    {type: "Play",          title: "Play1"},
    {type: "Distribute",    title: "Dist1"},
    {type: "Provide",       title: "Prov1"},
    {type: "Distribute",    title: "Dist2"},
    {type: "Provide",       title: "Prov2"},
    {type: "Distribute",    title: "Dist3"},
    {type: "Payment",       title: "Pay1"},
    {type: "Payment",       title: "Pay2"},
    {type: "Payment",       title: "Pay3"},
    {type: "Payment",       title: "Pay4"},
    {type: "Payment",       title: "Pay5"},
    {type: "Payment",       title: "Pay6"},
    {type: "Payment",       title: "Pay7"},
]

const objects = [
    "Song"
]
</script>

<template>
<h1>Contract</h1>

<h2>Parties</h2>
    <Party v-for="item in parties" v-bind:key="item" :title="item" />

<h2>Deontics</h2>
    <Deontic v-for="item in deontics" v-bind:key="item" :title="item" />
    
<h2>Actions</h2>
    <Action v-for="item in actions" v-bind:key="item" :type="item.type" :title="item.title" />
    
<h2>Objects</h2>
    <ObjectComp v-for="item in objects" v-bind:key="item" :title="item" />
    
</template>