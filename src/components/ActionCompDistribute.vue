<script setup>
const props = defineProps({
        data: String
    })
</script>

<template>
<h4>{{ data.identifier }}</h4>
<p>Type: {{ data.class }}</p>
<p>ActedBy: {{ data.actedBy }} </p>
<p>ActedOver:  </p>
<ul>
    <li v-for="item in data.actedOver" v-bind:key="item">
        {{item}}
    </li>
</ul>
</template>