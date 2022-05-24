import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/router'

import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "./style.css"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// import Contract from "./components/ContractComp.vue"
// import Party from "./components/PartyComp.vue"
// import Deontic from "./components/DeonticComp.vue"
// import Action from "./components/ActionComp.vue"
// import ObjectComp from "./components/ObjectComp.vue"

// import Provide from "./components/ActionCompProvide.vue"
// import Play from "./components/ActionCompPlay.vue"
// import Payment from "./components/ActionCompPayment.vue"
// import Distribute from "./components/ActionCompDistribute.vue"

// import Obligation from "./components/DeonticCompObligation.vue"
// import MCOPermission from "./components/DeonticCompMCOPermission.vue"

import FormSectionComp from "./components/FormSectionComp.vue"
import FormSectionRowComp from "./components/FormSectionRowComp.vue"
import FormSectionCardComp from "./components/FormSectionCardComp.vue"

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon);

// app.component('Contract', Contract)
// app.component('Party', Party)
// app.component('Deontic', Deontic)
// app.component('Action', Action)
// app.component('ObjectComp', ObjectComp)
// app.component('Provide', Provide)
// app.component('Play', Play)
// app.component('Payment', Payment)
// app.component('Distribute', Distribute)
// app.component('Obligation', Obligation)
// app.component('MCOPermission', MCOPermission)
app.component('FormSectionComp', FormSectionComp)
app.component('FormSectionRowComp', FormSectionRowComp)
app.component('FormSectionCardComp', FormSectionCardComp)

app.mount('#app')
