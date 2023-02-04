<template>
  <div class="relative">
    <input ref="input"
           class="w-full bg-slate-100 px-4 py-1 rounded-full"
           :value="keyword"
           :placeholder="placeholder"
           @keyup.enter="$event.target.blur()"
           @change="$emit('change-input', $event)"/>
    <button v-if="keyword"
            class="flex items-center absolute top-2 right-3 text-slate-500"
            @click="$emit('empty-input')">
      <i class="icon icon-close"></i>
    </button>
    <button v-else
            class="flex items-center absolute top-2 right-3 text-slate-500"
            @click="$refs['input'].blur()">
      <i class="icon icon-search"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  keyword: String,
  placeholder: String
})

defineEmits(['focusin-input', 'change-input', 'empty-input'])

</script>

<style scoped>

</style>