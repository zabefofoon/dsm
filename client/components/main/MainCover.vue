<template>
  <div class="w-screen bg-white h-screen relative overflow-hidden">
    <div class="w-full h-full flex items-center justify-center p-5 md:p-20">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 flex items-center justify-center">
          <img class="w-full"
               alt="dsm_1"
               src="@/assets/images/image_1.png"/>
        </div>
        <div class="text-xl md:text-4xl md:w-1/2 leading-snug text-slate-500">
          With DSM, you can write HTML and CSS for each component separately,
          preview your work, and see a list of all the components you've created.
          <br/>
          <router-link :to="username ? '/myProject' : '/sign'">
            <button class="w-full md:w-fit flex justify-center items-center text-xl border border-slate-500 text-slate-500
                hover:bg-blue-500 hover:text-white px-12 py-2 rounded-full mt-10">
              <span>Get Start</span>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/stores/auth.store"
import {storeToRefs} from "pinia"

const authStore = useAuthStore()

const {username} = storeToRefs(authStore)

</script>

<style scoped lang="scss">

.title {
  font-size: 72px;
}

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