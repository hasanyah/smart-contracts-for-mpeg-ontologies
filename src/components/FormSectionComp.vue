<script setup lang="ts">
import FormSectionRowComp from "../components/FormSectionRowComp.vue"
import ModalAddParty from "./ModalAddParty.vue"
import ModalAddIPO from "./ModalAddIPO.vue"
const props = defineProps({
    title: String,
    objtype: String,
    data: Object,
    comparedData: Object
})
</script>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
library.add(faCirclePlus)
</script>

<template>
<h2>
    <button type="button" class="btn btn-labeled" data-bs-toggle="modal" :data-bs-target="'#'+objtype+'StaticBackdropModal'">
        <span class="btn-label"><font-awesome-icon :icon="['fas', 'circle-plus']" /></span>
    </button>
    
    {{ title }}
</h2>

<div>
    <FormSectionRowComp v-for="item in data" :key="item" :data="item" :objtype="objtype"/>
    <div v-if="comparedData">COMPARABLE</div>
</div>

<ModalAddParty id="PartyStaticBackdropModal"/>
<ModalAddIPO id="WorkStaticBackdropModal"/>
</template>