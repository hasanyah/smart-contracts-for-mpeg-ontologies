<script setup>
const props = defineProps({
        data: Object
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