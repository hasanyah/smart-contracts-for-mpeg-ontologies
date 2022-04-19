import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import Contract from "./components/ContractComp.vue"
import Party from "./components/PartyComp.vue"
import Deontic from "./components/DeonticComp.vue"
import Action from "./components/ActionComp.vue"
import ObjectComp from "./components/ObjectComp.vue"

import Provide from "./components/ProvideActionComp.vue"
import Play from "./components/PlayActionComp.vue"
import Payment from "./components/PaymentActionComp.vue"
import Distribute from "./components/DistributeActionComp.vue"

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

app.mount('#app')
