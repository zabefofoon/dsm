import {defineNuxtRouteMiddleware, useState} from "#imports"

export type SeoData = {
  pageTitle?: string
  displayTitle?: string
  searchable?: boolean
}


export default defineNuxtRouteMiddleware((to, from) => {
  const seoData = useState<SeoData>('seoData', () => ({}))

  if (to.name === 'index') {
    seoData.value = {
      pageTitle: 'DSM',
      displayTitle: 'Projects',
      searchable: true
    }
  } else if (to.name === 'browse') {
    seoData.value = {
      pageTitle: 'DSM - Browse',
      displayTitle: 'Browse',
      searchable: true
    }
  }
})