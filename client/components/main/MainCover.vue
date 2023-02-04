<template>
  <div class="bg-black w-screen h-screen relative overflow-hidden">
    <div ref="imagesWrap" class="images-wrap h-full relative">
      <div class="w-full h-full absolute top-0 left-0 bg-layer-1">
        <picture>
          <source srcset="@/assets/images/star_layer_1.png"
                  media="(min-width: 768px)">
          <img class="w-full h-full"
               src="@/assets/images/m_star_layer_1.png"
               alt=""/>
        </picture>
      </div>
      <div class="w-full h-full absolute top-0 left-0 bg-layer-2">
        <picture>
          <source srcset="@/assets/images/star_layer_2.png"
                  media="(min-width: 768px)">
          <img class="w-full h-full"
               src="@/assets/images/m_star_layer_2.png"
               alt=""/>
        </picture>
      </div>
      <div class="w-full h-full absolute top-0 left-0 bg-layer-3">
        <picture>
          <source srcset="@/assets/images/star_layer_3.png"
                  media="(min-width: 768px)">
          <img class="w-full h-full"
               src="@/assets/images/m_star_layer_3.png"
               alt=""/>
        </picture>
      </div>
    </div>
    <div class="w-full h-full bg-layer-2 absolute top-0 left-0"></div>
    <div class="w-full h-full bg-layer-3 absolute top-0 left-0"></div>
    <div class="absolute top-0 left-0 z-index-1 w-full h-full flex items-center justify-center">
      <div class="flex flex-col gap-4 text-white">
        <div class="text-5xl font-bold overflow-hidden">
          <div class="slide-up">DSM</div>
        </div>
        <div class="text-xl font-thin overflow-hidden">
          <div class="slide-down">Css Storage Service</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"

const imagesWrap = ref<HTMLDivElement>()
</script>

<style scoped lang="scss">
.images-wrap {
  transform-origin: bottom;
}

.bg-layer-1 {
  animation: scale-up-1 30s linear infinite;
}

.bg-layer-2 {
  animation: scale-up-2 30s linear infinite;
}

.bg-layer-3 {
  animation: scale-up-3 30s linear infinite;
}

@keyframes scale-up-1 {
  0% {
    transform: scaleX(1) scaleY(1);
  }

  100% {
    transform: scaleX(1.5) scaleY(1.5);
  }
}

@keyframes scale-up-2 {
  0% {
    transform: scaleX(1) scaleY(1);
  }

  100% {
    transform: scaleX(1.75) scaleY(1.75);
  }
}

@keyframes scale-up-3 {
  0% {
    transform: scaleX(1) scaleY(1);
  }

  100% {
    transform: scaleX(2) scaleY(2);
  }
}

.slide-up {
  animation: slide-up 1000ms ease;
}

.slide-down {
  animation: slide-down 1000ms ease;
}

@keyframes slide-up {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes slide-down {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}
</style>