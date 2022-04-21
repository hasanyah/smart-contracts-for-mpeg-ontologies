import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import Contract from "./components/ContractComp.vue"
import Party from "./components/PartyComp.vue"
import Deontic from "./components/DeonticComp.vue"
import Action from "./components/ActionComp.vue"
import ObjectComp from "./components/ObjectComp.vue"

import Provide from "./components/ActionCompProvide.vue"
import Play from "./components/ActionCompPlay.vue"
import Payment from "./components/ActionCompPayment.vue"
import Distribute from "./components/ActionCompDistribute.vue"

import Obligation from "./components/DeonticCompObligation.vue"
import MCOPermission from "./components/DeonticCompMCOPermission.vue"

import FormSection from "./components/FormSectionComp.vue"

const app = createApp(App)
app.component('Contract', Contract)
app.component('Party', Party)
app.component('Deontic', Deontic)
app.component('Action', Action)
app.component('ObjectComp', ObjectComp)
app.component('Provide', Provide)
app.component('Play', Play)
app.component('Payment', Payment)
app.component('Distribute', Distribute)
app.component('Obligation', Obligation)
app.component('MCOPermission', MCOPermission)
app.component('FormSection', FormSection)

app.mount('#app')
