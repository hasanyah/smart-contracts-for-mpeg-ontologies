<script setup lang="ts">
const props = defineProps({
        ipoNameInput: String,
        ipoAddressInput: String
    })
</script>

<template>
<div class="modal fade" id="WorkStaticBackdropModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel1">New Intellectual Property</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
            <label for="ipoNameInput" class="form-label">Name</label>
            <input type="text" class="form-control" id="ipoNameInput" v-model="ipoNameInput" placeholder="John Doe">
        </div>
        <div class="mb-3">
            <label for="ipoAddressInput" class="form-label">Address</label>
            <input type="text" class="form-control" id="ipoAddressInput" v-model="ipoAddressInput" placeholder="Madrid">
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