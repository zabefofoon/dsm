<template>
  <div class="w-screen h-screen relative bg-black">
    <Swiper ref="swiper"
            class="w-full h-full"
            direction="vertical"
            effect="creative"
            :creativeEffect="effectOption"
            :mousewheel="{invert: true}"
            :modules="[Mousewheel, EffectCreative]"
            @activeIndexChange="onSwiperChange">
      <SwiperSlide>
        <MainCover/>
      </SwiperSlide>
      <SwiperSlide>
        <MainInst/>
      </SwiperSlide>
    </Swiper>
    <div
        class="hidden md:flex pointer-events-none items-end justify-center w-full h-full absolute top-0 z-10 p-10 opacity-80">
      <div class="flex flex-col items-center gap-1 transition-colors text-slate-500">
        <button class="flex pointer-events-auto"
                @click="prev">
          <i class="icon icon-arrow-top text-2xl"></i>
        </button>
        <i class="icon icon-mouse-scroll text-2xl"></i>
        <button class="flex pointer-events-auto"
                @click="next">
          <i class="icon icon-arrow-bottom text-2xl"></i>
        </button>
      </div>
    </div>
    <div class="hidden md:flex pointer-events-none flex items-end w-full h-full absolute top-0 z-10 p-10">
      <ul class="transition-colors pointer-events-auto opacity-80 text-slate-500">
        <li :class="{'opacity-30': currentSwiperIndex !== 0}">
          <button @click="to(0)">- DSM</button>
        </li>
        <li :class="{'opacity-30': currentSwiperIndex !== 1}">
          <button @click="to(1)">- Let`s start</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainCover from "~/components/main/MainCover.vue"
import {definePageMeta} from "#imports"
import {Swiper, SwiperSlide} from 'swiper/vue'
import {EffectCreative, Mousewheel, Swiper as _Swiper} from "swiper"
import 'swiper/css'
import 'swiper/css/mousewheel'
import 'swiper/css/effect-creative'
import {ref} from "vue"

definePageMeta({
  layout: 'main',
  middleware: 'seo'
})

const swiper = ref<typeof Swiper>()

const currentSwiperIndex = ref(0)

const effectOption = {
  prev: {
    shadow: false,
    translate: [0, '-20%', -1],
  },
  next: {
    translate: [0, '100%', 0],
  },
}

const onSwiperChange = (swiper: _Swiper) => {
  currentSwiperIndex.value = swiper.activeIndex
}
const next = () => swiper.value?.$el.swiper.slideNext()
const prev = () => swiper.value?.$el.swiper.slidePrev()
const to = (index: number) => swiper.value?.$el.swiper.slideTo(index)
</script>

<style scoped lang="scss">

.preserve-3d {
  transform-style: preserve-3d;
}
</style>