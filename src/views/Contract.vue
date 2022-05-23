<script setup>
</script>

<template>
  <h1 class="text-center">Sample Music Contract</h1>
  <div class="d-flex flex-row justify-content-center clearfix">
      <button class="btn btn-labeled btn-secondary float-left" @click="loadSampleData()">Load Sample Data</button>
      <button class="btn btn-labeled btn-secondary float-right" @click="resetData()">Reset Data</button>
  </div>
  <div class="d-flex flex-row justify-content-center">
      <input ref="file" class="custom-file-input" id="customFileInput" v-on:change="handleFileUpload()"  type="file">
  </div>
  <Contract :data="mainContract" @party-added="addParty"/>
</template>