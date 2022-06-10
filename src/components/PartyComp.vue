<script setup lang="ts">
import Field from './FomSectionCardFieldComp.vue'

const props = defineProps({
    data: Object,
    comparedData: Object,
    changesArePropagated: Boolean,
    propagatedAdditionalData: Object
})

function getDeonticFromOldVersion(deonticId: string): string {
    let deontic = props.propagatedAdditionalData.oldData.deontics.find((deontic) => deontic.identifier === deonticId);
    if (deontic)
        return deontic.metadata["rdfs:label"];
    else
        return deonticId;
}

function getDeonticFromNewVersion(deonticId: string): string {
    if (!props.changesArePropagated)
        return getDeonticFromOldVersion(deonticId)
    else {
        let deontic = props.propagatedAdditionalData.newData.deontics.find((deontic) => deontic.identifier === deonticId);
        if (deontic)
            return deontic.metadata["rdfs:label"];
        else
            return deonticId;
    }
        
}

function getActionFromOldVersion(actionId: string): string {
    let action = props.propagatedAdditionalData.oldData.actions.find((action) => action.identifier === actionId);
    if (action)
        return "action:" + action.identifier;
    else
        return actionId;
}

function getActionFromNewVersion(actionId: string): string {
    if (!props.changesArePropagated)
        return getActionFromOldVersion(actionId)
    else {
        let action = props.propagatedAdditionalData.newData.actions.find((action) => action.identifier === actionId);
        if (action)
            return "action:" + action.identifier;
        else
            return undefined
    }
}

</script>

<template>
<div>
    <Field :newText="changesArePropagated ? comparedData.metadata['rdfs:label'] : data.metadata['rdfs:label']" :oldText="data.metadata['rdfs:label']" title="Name"/>
    <Field :newText="changesArePropagated ? comparedData.class : data.class" :oldText="data.class" title="Role"/>
    <Field :newText="changesArePropagated ? comparedData.address: data.address" :oldText="data.address" title="Address"/>
    <span v-if="data.deonticsIssued && data.deonticsIssued.length > 0">
        <p><strong>Deontics Issued: </strong></p>
        <ul>
            <li v-for="deontic in data.deonticsIssued" :key="deontic">
                <Field :newText="getDeonticFromNewVersion(deontic)" :oldText="getDeonticFromOldVersion(deontic)"/>
            </li>
        </ul>
    </span>
    <span v-if="data.actionsIsSubject && data.actionsIsSubject.length > 0">
        <p><strong>Subject to following actions: </strong></p>
        <ul>
            <li v-for="action in data.actionsIsSubject" :key="action">
                <Field :newText="getActionFromNewVersion(action)" :oldText="getActionFromOldVersion(action)"/>
            </li>
        </ul>
    </span>
</div>
</template>