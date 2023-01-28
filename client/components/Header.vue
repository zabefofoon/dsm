<template>
  <header class="py-2 pl-2 pr-8 border flex gap-2 items-center">
    <figure class="flex items-center">
      <button v-show="!seoData?.searchable"
              class="pl-4 flex items-center p-1"
              @click="$router.back()">
        <i class="icon icon-arrow-left"></i>
      </button>
    </figure>
    <div v-if="seoData?.searchable"
         id="search"
         class="w-full md:w-1/3 relative">
    </div>
    <h3 v-else
        class="text-md">
      {{ seoData?.displayTitle }}
    </h3>
    <div class="ml-auto flex gap-3">
      <button class="text-2xl text-slate-500">
        <i class="icon icon-github"></i>
      </button>
      <button class="text-2xl text-slate-500">
        <i class="icon icon-instargram"></i>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import {useRouter, useState} from "#imports"
import {SeoData} from "~/middleware/seo"

const router = useRouter()
const seoData = useState<SeoData>('seoData')
</script>

<style scoped lang="scss">

</style>