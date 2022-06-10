<script setup lang="ts">
const props = defineProps({
    data: Object,
    comparedData: Object,
    changesArePropagated: Boolean,
    propagatedAdditionalData: Object
})
</script>

<template>
<div>
    <div class="row">
        <div class="col">
            Type: {{ data.class }}
        </div>
    </div>
</div>
</template>