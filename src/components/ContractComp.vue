<script setup lang="ts">
import { IPObject, Party } from '../types/ContractTypes.interface';
import FormSectionRowComp from './FormSectionRowComp.vue';

const props = defineProps({
    data: Object,
    comparedData: Object,
    contractName: String
})

const addedParties = getAddedParties()
const addedIPOs = getAddedIPOs()
const additionalDataToPropagate = props.comparedData ? {
    "oldData": {
        "deontics": props.data.deontics,
        "actions": props.data.actions
    },
    "newData": {
        "deontics": props.comparedData.deontics,
        "actions": props.comparedData.actions
    }
} : {}

function getComparedParty(partyId: string): Party {
    if (!props.comparedData)
        return undefined

    if (!props.comparedData.parties)
        return undefined

    let party = props.comparedData.parties.find((party) => party.identifier === partyId);
    return party;
}

function getComparedIPO(ipoId: string) {
    if (!props.comparedData)
        return undefined

    if (!props.comparedData.ipObjects)
        return undefined

    let ipo = props.comparedData.ipObjects.find((ipo) => ipo.identifier === ipoId);
    return ipo;
}

function isPartyRemoved(partyId: string): string {
    if (!props.comparedData)
        return undefined

    let comparedParty = props.comparedData.parties.find((party) => party.identifier === partyId);
    if (!comparedParty)
        return "removed"
    else
        return undefined
}

function isIPORemoved(ipoId: string): string {
    if (!props.comparedData)
        return undefined

    let comparedIPO = props.comparedData.ipObjects.find((ipo) => ipo.identifier === ipoId);
    if (!comparedIPO)
        return "removed"
    else
        return undefined
}

function getAddedParties(): Party[] {
    let addedParties = []
    if (!props.comparedData)
        return addedParties

    props.comparedData.parties.forEach((party) => {
        let partyInOldVersion = props.data.parties.find((p) => { return p.identifier == party.identifier });
        if (!partyInOldVersion)
            addedParties.push(party)
    });
    return addedParties
}

function getAddedIPOs(): IPObject[] {
    let addedIPOs = []
    if (!props.comparedData)
        return addedIPOs

    props.comparedData.ipObjects.forEach((ipo) => {
        let ipoInOldVersion = props.data.ipObjects.find((p) => { return p.identifier == ipo.identifier });
        if (!ipoInOldVersion)
            addedIPOs.push(ipo)
    });
    return addedIPOs
}
</script>

<template>
    <h1 class="text-center">Contract: {{ contractName }}</h1>
    <h3 v-if="comparedData" class="text-center">Changes from version: {{ data.versionNumber }} to {{ comparedData.versionNumber }}</h3>
    <h3 v-else class="text-center">Version: {{ data.versionNumber }}</h3>
    <div class="col-lg-9">
        <h2>Parties</h2>
        <FormSectionRowComp v-for="item in data.parties" :key="item" 
            objtype="Party"
            :addedOrRemoved="isPartyRemoved(item.identifier)"
            :data="item"
            :comparedData="getComparedParty(item.identifier)" 
            :requiresComparison="comparedData !== undefined"
            :propagatedAdditionalData="additionalDataToPropagate"/>
        <!-- Insert the parties that exist in the compared version but does not exist in the version that is being viewed -->
        <FormSectionRowComp 
            v-if="comparedData && addedParties.length > 0"
            v-for="item in addedParties" :key="item.identifier" 
            objtype="Party"
            addedOrRemoved="added"
            :data="item"
            :comparedData="getComparedParty(item.identifier)" 
            :requiresComparison="true" />

        <h2>Intellectual Property</h2>
        <FormSectionRowComp v-for="item in data.ipObjects" :key="item" 
            objtype="Work" 
            :addedOrRemoved="isIPORemoved(item.identifier)"
            :data="item"
            :comparedData="getComparedIPO(item.identifier)" 
            :requiresComparison="comparedData !== undefined"
            :propagatedAdditionalData="additionalDataToPropagate"/>
        <!-- Insert the IPOs that exist in the compared version but does not exist in the version that is being viewed -->
        <FormSectionRowComp 
            v-if="comparedData && addedIPOs.length > 0"
            v-for="item in addedIPOs" :key="item.identifier" 
            objtype="Work"
            addedOrRemoved="added"
            :data="item"
            :comparedData="getComparedIPO(item.identifier)" 
            :requiresComparison="true" />
    </div>
</template>
