<script setup lang="ts">
const props = defineProps({
        data: Object,
        type: String
    })
</script>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
library.add(faPen)
library.add(faXmark)
</script>

<template>
<div class="container mb-4">
    <div class="row justify-content-md-center">
        <div class="col-lg-6 border border-secondary rounded">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn">
                    <span class="btn-label"><font-awesome-icon :icon="['fas', 'pen']" /></span>
                </button>
                <button type="button" class="btn" >
                    <span class="btn-label"><font-awesome-icon :icon="['fas', 'xmark']" /></span>
                </button>
            </div>
            <div></div>
            <component :is="type" :data="data"/>
        </div>
    </div>
</div>
</template>