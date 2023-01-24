<template>
  <div class="flex items-center gap-2 relative">
    <label for="search"
           class="w-fit h-fit text-xl text-slate-500 flex items-center">
      <i class="icon icon-search"></i>
    </label>
    <input id="search"
           class="p-1 text-sm border border-x-0 border-t-0 border-b-1 border-slate-300"
           placeholder="Search"
           :value="keyword"
           @focusin="$emit('focusin-input', $event)"
           @change="$emit('change-input', $event)"
           @keydown.enter="$event.target.blur()"/>
    <button v-if="keyword"
            class="flex items-center absolute right-1 text-slate-500"
            @click="$emit('empty-input', $event)">
      <i class="icon icon-close"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  keyword: String
})

defineExpose(['focusin-input', 'change-input', 'empty-input'])
</script>

<style scoped>

</style>