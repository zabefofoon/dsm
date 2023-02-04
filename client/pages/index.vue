<template>
  <div>
    <MainCover/>
  </div>
</template>

<script setup lang="ts">
import MainCover from "~/components/main/MainCover.vue"
import {definePageMeta} from "#imports"
definePageMeta({
  layout: 'main',
  middleware: 'seo'
})
</script>

<style scoped lang="scss">

</style>