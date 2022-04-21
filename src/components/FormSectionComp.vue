<script setup>
const props = defineProps({
        title: String,
        type: String,
        targetId: String,
        data: Object
    })
</script>

<template>
<h2>
    {{ title }}
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+targetId" aria-expanded="false" :href="'#'+targetId" role="button" :aria-controls="targetId">Show/Hide</button>
</h2>
<div class="collapse" :id="targetId">
    <component :is="type" v-for="item in data" v-bind:key="item" :data="item"/>
</div>

</template>