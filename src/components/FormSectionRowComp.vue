<script setup lang="ts">
const props = defineProps({
        data: Object,
        type: String
    })
</script>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
library.add(faCircleInfo)
</script>

<template>
<div class="mx-5">
<p>{{ data.metadata["rdfs:label"] }} <span><font-awesome-icon data-bs-toggle="tooltip" data-bs-placement="top" :title="data.identifier" :icon="['fas', 'circle-info']" /></span></p>
<FormSectionCard :data="data" :type="type" @party-added="addParty"/>
</div>
</template>