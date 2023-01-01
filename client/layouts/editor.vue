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
</template>

<script setup lang="ts">

import Header from "~/components/Header.vue"
import Aside from "~/components/Aside.vue"
import Footer from "~/components/Footer.vue"
import MainContent from "~/components/MainContent.vue"</script>

<style lang="scss" scoped>

</style>