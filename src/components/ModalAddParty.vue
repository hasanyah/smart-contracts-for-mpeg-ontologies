<script setup lang="ts">
const props = defineProps({
        partyNameInput: String,
        partyAddressInput: String
    })
</script>

<template>
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
        <button type="button" class="btn btn-primary">Add</button>
      </div>
    </div>
  </div>
</div>
</template>