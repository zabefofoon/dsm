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
  <ModalsContainer/>
</template>

<script setup lang="ts">
import {$vfm, ModalsContainer} from 'vue-final-modal'
import {onMounted} from "#imports"

onMounted(() => {
  $vfm.hideAll()
})
</script>
<style lang="scss" scoped>

</style>