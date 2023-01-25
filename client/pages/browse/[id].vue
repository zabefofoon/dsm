<template>
  <iframe ref="iframe"
          class="w-full h-full"
          src="https://zabefofoon.github.io/dsm-embbedded"
          allow="clipboard-read; clipboard-write"
          @load="postGroups"></iframe>
</template>

<script setup lang="ts">
import {definePageMeta, onMounted, ref, useRoute, useRouter, useState} from "#imports"
import {SeoData} from "~/middleware/seo"
import {useNavigationStore} from "~/stores/navigation"
import projectApi from "~/api/project/projectApi"

const router = useRouter()
const route = useRoute()

definePageMeta({
  layout: 'editor',
  middleware: 'seo'
})

const seoData = useState<SeoData>('seoData')
seoData.value = {
  pageTitle: 'DSM - Browse',
  displayTitle: 'Browse'
}

const data = ref<string>('[]')

const iframe = ref<HTMLIFrameElement>()
const postGroups = () => setTimeout(() => iframe.value
    ?.contentWindow
    ?.postMessage({
      type: 'loadGroups',
      groups: JSON.parse(data.value)
    }, '*'))

onMounted(async () => {
  const projectDetail = await projectApi.getPublicProjectDetail(String(route.params['id']))
  data.value = projectDetail.data.data ? projectDetail.data.data : '[]'
  seoData.value = {
    pageTitle: `DSM - Browse ${projectDetail.data.name ? '> ' + projectDetail.data.name : ''}`,
    displayTitle: `Browse ${projectDetail.data.name ? '> ' + projectDetail.data.name : ''}`
  }
  postGroups()
})

const navigationStore = useNavigationStore()
navigationStore.showBackButton({href: '/'})

</script>

<style scoped>

</style>