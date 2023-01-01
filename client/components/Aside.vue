<template>
  <nav class="flex flex-col gap-2 w-auto p-2 border shrink-0">
    <NuxtLink to="/">
      <button class="flex items-center justify-center text-2xl p-1 border shadow-md rounded-full text-slate-400">
        <i class="icon icon-grid"></i>
      </button>
    </NuxtLink>
    <NuxtLink to="/browse">
      <button class="flex items-center justify-center text-2xl p-1 border shadow-md rounded-full text-slate-400">
        <i class="icon icon-explore"></i>
      </button>
    </NuxtLink>
  </nav>
</template>
<script setup lang="ts">

</script>

<style lang="scss">
.router-link-exact-active {
  button {
    color: #1B98E0;
    background: #E8F1F2;
  }
}
</style>