<script setup lang="ts">

const props = defineProps({
    data: Object,
    deontics: [],
    actions: []
})

function getDeonticById(deonticId: string) {
    let deontic = props.deontics.find(d => d.identifier === deonticId);
    if (deontic)
        return deontic.metadata["rdfs:label"]
    else
        return "N/A"
}

function getActionById(actionId: string) {
    let action = props.actions.find(d => d.identifier === actionId);
    console.log("actionId:" + actionId)
    console.log(action)
    if (action)
        return action.class
    else
        return "N/A"
}

</script>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
library.add(faPen)
library.add(faXmark)
</script>

<template>
<div class="container-fluid mb-4 justify-content-md-center border border-secondary rounded">
    <div class="d-flex justify-content-end">
        <button type="button" class="btn">
            <span class="btn-label"><font-awesome-icon :icon="['fas', 'pen']" /></span>
        </button>
        <button type="button" class="btn" @click="$emit('partyDeleted', data.identifier)">
            <span class="btn-label"><font-awesome-icon :icon="['fas', 'xmark']"/></span>
        </button>
    </div>
    <div>
        <div><span>Label: {{ data.metadata["rdfs:label"] }}</span></div>
        <div><span>Class: {{ data.class }}</span></div>
        <div><span>Address: {{ data.address }}</span></div>
        <span v-if="data.deonticsIssued && data.deonticsIssued.length > 0">
            <p><strong>Deontics Issued: </strong></p>
            <ul>
                <li v-for="deontic in data.deonticsIssued" :key="deontic">
                    <p>{{ getDeonticById(deontic) }}</p>
                </li>
            </ul>
        </span>
        <span v-if="data.actionsIsSubject && data.actionsIsSubject.length > 0">
            <p><strong>Subject to following actions: </strong></p>
            <ul>
                <li v-for="action in data.actionsIsSubject" :key="action">
                    <p>{{ getActionById(action) }}</p>
                </li>
            </ul>
        </span>
    </div>
</div>
</template>