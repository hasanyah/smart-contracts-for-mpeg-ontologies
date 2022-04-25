<script setup>
const props = defineProps({
        data: Object
    })
</script>

<template>
<h1>Contract</h1>

<FormSection title="Parties" targetId="partyList" :data="data.parties" type="Party"/>
<FormSection title="Deontics" targetId="deonticsList" :data="data.deontics" type="Deontic"/>
<FormSection title="Actions" targetId="actionList" :data="data.actions" type="Action"/>
<FormSection title="Objects" targetId="objectList" :data="data.objects" type="ObjectComp"/>
</template>
