<template>
browse
</template>

<script setup lang="ts">
import {useNavigationStore} from "~/stores/navigation"
import {definePageMeta} from "#imports"

definePageMeta({
  layout: 'editor',
  middleware: 'seo'
})

const navigationStore = useNavigationStore()
navigationStore.showBackButton({href: '/'})
</script>

<style scoped lang="scss">

</style>