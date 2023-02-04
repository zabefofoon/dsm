<template>
  <iframe ref="iframe"
          class="w-full h-full"
          src="https://zabefofoon.github.io/dsm-embbedded/?save=true"
          allow="clipboard-read; clipboard-write"
          @load="postGroups"></iframe>
</template>

<script setup lang="ts">
import {definePageMeta, onBeforeUnmount, onMounted, ref, useRoute, useRouter, useState} from "#imports"
import {SeoData} from "~/middleware/seo"
import projectApi from "~/api/project/project.api"

const router = useRouter()
const route = useRoute()

definePageMeta({
  layout: 'editor',
  middleware: 'seo'
})

const seoData = useState<SeoData>('seoData')
seoData.value = {
  pageTitle: 'DSM - My Project',
  displayTitle: 'My project'
}

const data = ref<string>('[]')

const iframe = ref<HTMLIFrameElement>()
const postGroups = () => setTimeout(() => iframe.value
    ?.contentWindow
    ?.postMessage({
      type: 'loadGroups',
      groups: JSON.parse(data.value)
    }, '*'))

const updateProjectDetail = (event: MessageEvent) => {
  if (event.data.type === 'saveGroups')
    projectApi.updateProjectDetail(String(route.params['id']), event.data.groups)
  alert('save the project')
}

onMounted(async () => {
  const projectDetail = await projectApi.createProjectDetail(String(route.params['id']))
  data.value = projectDetail.data.data ? projectDetail.data.data : '[]'
  window.addEventListener('message', updateProjectDetail)
  seoData.value = {
    pageTitle: `DSM - My Project > ${projectDetail.data.name}`,
    displayTitle: `My project > ${projectDetail.data.name}`
  }
  postGroups()
})

onBeforeUnmount(() => window.removeEventListener('message', updateProjectDetail))
</script>

<style scoped>

</style>