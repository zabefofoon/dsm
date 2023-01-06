<template>
  <header class="p-3 border flex gap-4 items-center">
    <figure class="flex items-center">
      <button v-show="isShowBackButton"
              class="flex items-center p-1"
              @click="back(isShowBackButton?.href)">
        <i class="icon icon-arrow-left"></i>
      </button>
      <img v-show="!isShowBackButton"
           class="w-6"
           alt="dsm"
           src="@/assets/images/logo.png"/>
    </figure>
    <h3 class="text-lg">
      {{ seoData?.displayTitle }}
    </h3>
  </header>
</template>

<script setup lang="ts">
import {useRouter, useState} from "#imports"
import {SeoData} from "~/middleware/seo"
import {useNavigationStore} from "~/stores/navigation"
import {storeToRefs} from 'pinia'

const router = useRouter()
const seoData = useState<SeoData>('seoData')

const navigationStore = useNavigationStore()
const {isShowBackButton} = storeToRefs(navigationStore)

const back = (path?: string) => path
    ? router.replace({path})
    : router.back()

</script>

<style scoped lang="scss">

</style>