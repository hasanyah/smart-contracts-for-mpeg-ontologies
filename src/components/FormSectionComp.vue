<script setup lang="ts">
const props = defineProps({
        title: String,
        type: String,
        targetId: String,
        data: Object,
        partyNameInput: String,
        partyAddressInput: String
    })
const emit = defineEmits(['partyAdded'])
</script>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
library.add(faCirclePlus)
</script>

<template>
<h2>
    <button type="button" class="btn btn-labeled" data-bs-toggle="modal" :data-bs-target="'#'+type+'StaticBackdropModal'">
        <span class="btn-label"><font-awesome-icon :icon="['fas', 'circle-plus']" /></span>
    </button>
    
    {{ title }}
    <!-- <button class="btn btn-primary" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+targetId" aria-expanded="false" :href="'#'+targetId" role="button" :aria-controls="targetId">Show/Hide</button>

    <button class="btn btn-secondary" type="button" data-bs-toggle="modal" :data-bs-target="'#'+type+'StaticBackdropModal'">Add {{type}}</button> -->
</h2>

<div>
    <FormSectionRow v-for="item in data" :key="item" :data="item" :type="type"/>
    <!-- <component :is="type" v-for="item in data" :key="item" :data="item"/> -->
</div>

<div class="modal fade" id="PartyStaticBackdropModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">New Party</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
            <label for="partyNameInput" class="form-label">Name</label>
            <input type="text" class="form-control" id="partyNameInput" v-model="partyNameInput" placeholder="John Doe">
        </div>
        <div class="mb-3">
            <label for="partyAddressInput" class="form-label">Address</label>
            <input type="text" class="form-control" id="partyAddressInput" v-model="partyAddressInput" placeholder="Madrid">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="$emit('partyAdded', {'name': partyNameInput, 'address': partyAddressInput})">Add</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="DeonticStaticBackdropModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">New Deontic</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Add</button>
      </div>
    </div>
  </div>
</div>
</template>