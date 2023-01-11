<template>
  <VueFinalModal v-slot="{ params, close }"
                 v-bind="$attrs"
                 classes="modal-container"
                 content-class="modal-content">
    <span class="modal__title">
      New Project
    </span>
    <div class="modal__content">
      <div class="flex flex-col gap-2 p-2 text-sm">
        <div class="flex gap-5 items-center">
          <label>Name</label>
          <input v-model="dataForRequest.name"
                 class="border p-1"
                 placeholder="name"/>
        </div>
        <div class="flex gap-5 items-center">
          <label>Private</label>
          <div class="flex gap-2">
            <div class="flex gap-1">
              <input v-model="dataForRequest.isPrivate"
                     id="yes"
                     :value="true"
                     type="radio"
                     class="cursor-pointer"/>
              <label for="yes"
                     class="cursor-pointer">Y</label>
            </div>
            <div class="flex gap-1">
              <input v-model="dataForRequest.isPrivate"
                     id="no"
                     :value="false"
                     type="radio"
                     class="cursor-pointer"/>
              <label for="no"
                     class="cursor-pointer">N</label>
            </div>
          </div>
        </div>
        <div v-if="isInvalid"
             class="text-xs text-center text-red-500">write your project name</div>
      </div>
    </div>
    <div class="modal__action">
      <button class="text-white px-4 py-1"
              style="background: #1B98E0"
              @click="create(close)">
        Create
      </button>
      <button class="px-4 py-1"
              @click="$emit('cancel', close)">
        Cancel
      </button>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import {VueFinalModal} from 'vue-final-modal'
import {ref} from "vue"
import {ProjectType} from "../../server/model/ProjectType"

const emit = defineEmits(['create', 'cencel'])

const dataForRequest = ref<Partial<ProjectType>>({
  isPrivate: false,
  name: 'New Project'
})

const isInvalid = ref(false)

const create = (close: () => void) => {
  if (!dataForRequest.value.name) {
    isInvalid.value = true
    return
  }
  emit('create', dataForRequest.value, close)
}

</script>
<style scoped lang="scss">

</style>