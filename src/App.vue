<script setup>
import { ref } from 'vue'
import axios from 'axios'
import sampleRdf from "./assets/sample.rdf?raw";

const apiResponse = ref("");
computed: {
  console: () => console
}
function parserMco() {                   
  // console.log(sampleRdf)
  const headers = {
    'Content-Type' : 'plain/text'
  }
  axios.post("https://scm.linkeddata.es/api/parser/mco", sampleRdf, {headers})
  .then(response => Console.log(response))
  .catch(error => {
    this.errorMessage = error.message;
    apiResponse.value = "The server responded: " + "\n" + error;
  });
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      Hello World in Vue
    </div>
    <button @click="parserMco()">Send MCO Post Request</button>
  </header>
  <div>
    {{apiResponse}}
  </div>
</template>
