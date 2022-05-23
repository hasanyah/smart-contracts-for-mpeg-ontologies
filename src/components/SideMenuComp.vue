<script setup lang="ts">
import { RouterLink  } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'
import router from '../router/router'

const { name } = storeToRefs(useUserStore())
const { setUser } = useUserStore()

function changeUser(userName) {
    if (name !== userName) {
        setUser(userName)
        router.push('/')
    }
}

setUser("Unknown")
</script>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse, faFileContract, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
library.add({faHouse, faFileContract, faFileCirclePlus})
</script>

<template>
<div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary sidebar">
    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <div class="dropdown pb-4">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://avatars.githubusercontent.com/u/3333746?v=4" alt="hugenerd" width="30" height="30" class="rounded-circle">
                <span class="d-none d-sm-inline mx-1">User - <br/> {{ name }}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                <li><a class="dropdown-item" href="#" @click="changeUser('Creator')">Creator</a></li>
                <li><a class="dropdown-item" href="#" @click="changeUser('Streaming Service')">Streaming Service</a></li>
            </ul>
        </div>
        <hr>
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
                <a href="/" class="nav-link link-light align-middle px-0">
                    <font-awesome-icon :icon="['fas', 'house']" /> 
                    <span class="ms-1 d-none d-sm-inline">
                        <RouterLink to="/">Home</RouterLink>
                    </span>
                </a>
            </li>
            <li>
                <a href="#" class="nav-link link-light px-0 align-middle">
                    <font-awesome-icon :icon="['fas', 'file-contract']" /> 
                    <span class="ms-1 d-none d-sm-inline">
                        <RouterLink to="/mycontracts">My Contracts</RouterLink>
                    </span></a>
            </li>
            <li>
                <a href="#" class="nav-link link-light px-0 align-middle">
                    <font-awesome-icon :icon="['fas', 'file-circle-plus']" /> 
                    <span class="ms-1 d-none d-sm-inline">
                        <RouterLink to="/create">New Contract</RouterLink>
                    </span></a>
            </li>
        </ul>
    </div>
</div>
</template>