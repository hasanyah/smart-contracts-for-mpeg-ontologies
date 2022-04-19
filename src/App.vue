<script setup>
import { ref } from 'vue'
import axios from 'axios'
import sampleRdf from "./assets/sample.rdf?raw"

const parserEndpoint = "https://scm.linkeddata.es/api/parser/mco"
const apiResponse = ref("API response will be shown here");
computed: {
  console: () => console
}
function parserMco() {                   
  const headers = {
    'Content-Type' : 'text/plain'
  }
  axios.post(parserEndpoint, sampleRdf, {headers})
  .then(response => apiResponse.value = "The server responded: " + "\n" + JSON.stringify(response.data, null, 2))
  .catch(error => {
    apiResponse.value = "The server responded: " + "\n" + error;
  });
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <!-- <div class="wrapper">
      Hello World in Vue
    </div>
    <button @click="parserMco()">Send MCO Post Request</button> -->
  </header>
  <!-- <pre>{{ apiResponse }}</pre> -->
  <Contract />
</template>
