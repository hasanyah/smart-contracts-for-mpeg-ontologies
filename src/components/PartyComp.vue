<script setup>
const props = defineProps({
        data: Object
    })
</script>

<template>
<div>
<h4>{{ data.metadata["rdfs:label"] }}</h4>
<p>Type: {{ data.class }} </p>
<p>Identifier: {{ data.identifier }} </p>
<span v-if="data.deonticsIssued">
<p>Deontics Issued: </p>
    <ul>
        <li v-for="item in data.deonticsIssued" v-bind:key="item">
            {{item}}
        </li>
    </ul>
</span>
</div>
</template>