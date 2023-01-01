<template>
  <header class="p-3 border flex gap-4 items-center">
    <figure>
      <img class="w-6" src="~/assets/images/logo.png"/>
    </figure>
    <h3 class="text-lg">
      {{ seoData?.displayTitle }}
    </h3>
  </header>
</template>

<script setup lang="ts">
import {useState} from "#imports"
import {SeoData} from "~/middleware/seo"

const seoData = useState<SeoData>('seoData')
</script>

<style scoped lang="scss">

</style>