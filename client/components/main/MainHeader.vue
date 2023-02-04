<template>
  <header class="flex w-full header-bg fixed top-0 left-0 z-10 px-10 py-2">
    <figure class="flex items-center gap-4 w-6">
      <router-link to="/">
        <img class="w-full"
             src="@/assets/images/logo.png"
             alt="dsm"/>
      </router-link>
    </figure>
    <div class="ml-auto flex align-items-center gap-3 text-slate-500">
      <button>Documentation</button>
      <router-link to="/sign">
        <button>Sign</button>
      </router-link>
      <router-link to="/browse">
        <button>Browse</button>
      </router-link>
      <span>|</span>
      <button class="text-2xl text-slate-500 flex items-center">
        <i class="icon icon-github"></i>
      </button>
      <button class="text-2xl text-slate-500 flex items-center">
        <i class="icon icon-instargram"></i>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.header-bg {
  background: rgba(255, 255, 255, .9);
}
</style>