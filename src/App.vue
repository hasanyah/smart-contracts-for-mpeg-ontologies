<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideMenuComp from './components/SideMenuComp.vue'
// import { ref } from 'vue'
// import axios from 'axios'
// import sampleRdf from "./assets/sample.rdf?raw"
// import _ from 'lodash';

// import { useContractStore } from '@/store/contract'
// const store = useContractStore()

// const props = defineProps({
//         mainContract: Object
//     })
// const parserEndpoint = "https://scm.linkeddata.es/api/parser/mco"
// const emptyContract = {"parties": [], "deontics": [], "actions": [], "objects": []}
// const mainContract = ref({});
// resetData()
// const file = ref(null)
// computed: {
//   console: () => console
// }
// function parserMco() {                   
//   const headers = {
//     'Content-Type' : 'text/plain'
//   }
//   axios.post(parserEndpoint, sampleRdf, {headers})
//   .then(response => apiResponse.value = "The server responded: " + "\n" + JSON.stringify(response.data, null, 2))
//   .catch(error => {
//     apiResponse.value = "The server responded: " + "\n" + error;
//   });
// }

// function loadSampleData() {
//     mainContract.value = mainContract.value = _.cloneDeep(sampleContract);
// }
// function resetData() {
//     mainContract.value = _.cloneDeep(emptyContract);
// }
// const handleFileUpload = async() => {
//     const reader = new FileReader();
//     reader.addEventListener('load', (event) => {
//         const result = event.target.result;
//         console.log(result)
//         mainContract.value = _.cloneDeep(JSON.parse(result).contracts[0]);
//     });
//     reader.readAsText(file.value.files[0]);
// }
</script>

<template>
    <div class="container-fluid">
        <div class="row flex-nowrap">
            <SideMenuComp />
            <div class="col py-3">
                <RouterView />
            </div>
        </div>
    </div>
</template>
