<script setup>
const props = defineProps({
        data: Object
    })
const emit = defineEmits(['partyAdded'])
function addParty(party) {
    emit('partyAdded', party);
}
</script>

<template>
<div class="m-5">
    <FormSection title="Parties" targetId="partyList" :data="data.parties" type="Party" @party-added="addParty"/>
    <!-- <FormSection title="Deontics" targetId="deonticsList" :data="data.deontics" type="Deontic"/>
    <FormSection title="Actions" targetId="actionList" :data="data.actions" type="Action"/> -->
    <FormSection title="Objects" targetId="objectList" :data="data.objects" type="ObjectComp"/>
</div>
</template>
