<template>
  <div class="w-full overflow-hidden">
    <MainHeader/>
    <main>
      <slot></slot>
    </main>
    <footer class="hidden">
      footer
    </footer>
  </div>
</template>

<script setup lang="ts">
import MainHeader from "~/components/main/MainHeader.vue"</script>
<style lang="scss" scoped>

</style>