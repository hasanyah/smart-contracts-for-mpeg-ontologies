import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import ContractView from '../views/ContractView.vue'
import CreateNewContractView from '../views/CreateNewContract.vue'
import MyContractsView from '../views/MyContracts.vue'

const router = createRouter({
    history: createWebHistory(), 
    routes: [
      {
        path: '/',
        name: 'main',
        component: MainView
      },
      {
        path: '/contract/:contractid',
        name: 'contract',
        component: ContractView
      },
      {
        path: '/mycontracts',
        name: 'mycontracts',
        component: MyContractsView
      },
      {
        path: '/create',
        name: 'createnewcontract',
        component: CreateNewContractView
      }
    ]
  })

  export default router