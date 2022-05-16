<script setup>
const props = defineProps({
        data: String
    })
</script>

<template>
<h4>{{ data.identifier }}</h4>
<p>Type: {{ data.class }}</p>
<p>ActedBy: {{ data.actedBy }} </p>
<span v-if="data.actedOver">
<p>ActedOver:  </p>
<ul>
    <li v-for="item in data.actedOver" :key="item">
        {{item}}
    </li>
</ul>
</span>
<span v-if="data.beneficiaries">
<p>Beneficiaries:  </p>
<ul>
    <li v-for="item in data.beneficiaries" :key="item">
        {{item}}
    </li>
</ul>
</span>
<p v-if="data.amount">Amount: {{ data.amount }}</p>
<p v-if="data.incomePercentage">Income Percentage: {{ data.incomePercentage }}</p>
</template>