<template>
  <div class="flex w-screen h-screen">
    <Aside/>
    <div class="flex flex-col w-full h-screen">
      <Header/>
      <MainContent>
        <slot/>
      </MainContent>
      <Footer/>
    </div>
  </div>
  <ModalsContainer/>
</template>

<script setup lang="ts">
import Header from "~/components/editor/Header.vue"
import Aside from "~/components/editor/Aside.vue"
import Footer from "~/components/editor/Footer.vue"
import MainContent from "~/components/editor/MainContent.vue"
import {ModalsContainer} from 'vue-final-modal'</script>
<style lang="scss" scoped>

</style>