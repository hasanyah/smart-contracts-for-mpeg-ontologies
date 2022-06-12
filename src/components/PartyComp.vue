<script setup lang="ts">
import Field from './FomSectionCardFieldComp.vue'

const props = defineProps({
    data: Object,
    comparedData: Object,
    changesArePropagated: Boolean,
    propagatedAdditionalData: Object,
    recentlyAdded: Boolean
})

function getDeonticFromViewedVersion(deonticId: string): string {
    let deontic;
    if (props.recentlyAdded)
        deontic = props.propagatedAdditionalData.comparedVersionData.deontics.find((deontic) => deontic.identifier === deonticId);
    else
        deontic = props.propagatedAdditionalData.viewedVersionData.deontics.find((deontic) => deontic.identifier === deonticId);
    
    if (deontic)
        return deontic.identifier + ' ' + deontic.metadata["rdfs:label"];
    else
        return undefined;
}

function getDeonticFromComparedVersion(deonticId: string): string {
    if (!props.changesArePropagated || props.recentlyAdded)
        return getDeonticFromViewedVersion(deonticId)
    else {
        let deontic = props.propagatedAdditionalData.comparedVersionData.deontics.find((deontic) => deontic.identifier === deonticId);
        if (deontic)
            return deontic.identifier + ' ' + deontic.metadata["rdfs:label"];
        else
            return undefined;
    }
        
}

function getActionFromViewedVersion(actionId: string): string {
    let action;
    if (props.recentlyAdded)
        action = props.propagatedAdditionalData.comparedVersionData.actions.find((action) => action.identifier === actionId);
    else
        action = props.propagatedAdditionalData.viewedVersionData.actions.find((action) => action.identifier === actionId);

    if (action) {
        if (action.type === "Payment")
            return action.identifier + ' ' + action.actedBy + " - " + action.type + " - " + action.beneficiaries.join(',') + " - " + action.incomePercentage ? action.incomePercentage : action.amount;
        else
            return action.identifier + ' ' + action.actedBy + " - " + action.type + " - " + action.actedOver.join(',');
    }
    else
        return undefined;
}

function getActionFromComparedVersion(actionId: string): string {
    if (!props.changesArePropagated && !props.recentlyAdded)
        return getActionFromViewedVersion(actionId)
    else {
        let action = props.propagatedAdditionalData.comparedVersionData.actions.find((action) => action.identifier === actionId);
        if (action) {
            if (action.type === "Payment")
                return action.identifier + ' ' + action.actedBy + " - " + action.type + " - " + action.beneficiaries.join(',') + " - " + action.incomePercentage ? action.incomePercentage : action.amount;
            else
                return action.identifier + ' ' + action.actedBy + " - " + action.type + " - " + action.actedOver.join(',');
        }
        else
            return undefined
    }
}

</script>

<template>
<div>
    <Field :comparedText="changesArePropagated ? comparedData.metadata['rdfs:label'] : data.metadata['rdfs:label']" :viewedText="data.metadata['rdfs:label']" title="Name"/>
    <Field :comparedText="changesArePropagated ? comparedData.class : data.class" :viewedText="data.class" title="Role"/>
    <Field :comparedText="changesArePropagated ? comparedData.address: data.address" :viewedText="data.address" title="Address"/>
    <span v-if="data.deonticsIssued && data.deonticsIssued.length > 0">
        <p><strong>Deontics Issued: </strong></p>
        <ul>
            <li v-for="deontic in data.deonticsIssued" :key="deontic">
                <Field :comparedText="getDeonticFromComparedVersion(deontic)" :viewedText="getDeonticFromViewedVersion(deontic)"/>
            </li>
        </ul>
    </span>
    <span v-if="data.actionsIsSubject && data.actionsIsSubject.length > 0">
        <p><strong>Subject to following actions: </strong></p>
        <ul>
            <li v-for="action in data.actionsIsSubject" :key="action">
                <Field :comparedText="getActionFromComparedVersion(action)" :viewedText="getActionFromViewedVersion(action)"/>
            </li>
        </ul>
    </span>
</div>
</template>