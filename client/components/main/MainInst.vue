<template>
  <div class="w-screen h-screen relative overflow-hidden bg-white">
    <div class="w-full h-full flex flex-col md:flex-row items-center justify-center p-5 md:p-20">
      <div class="md:w-1/2 order-2 md:order-2">
      <span class="text-xl md:text-4xl leading-snug text-slate-500">
      Get organized and streamline your CSS development process with DSM.
      </span><br/>
        <router-link to="/browse">
          <button class="w-full md:w-fit flex justify-center items-center text-xl border border-slate-500 text-slate-500
              hover:bg-blue-500 hover:text-white px-12 py-2 rounded-full mt-10">
            <span>Browse projects</span>
          </button>
        </router-link>
      </div>
      <div class="order-1 md:order-2 md:w-1/2 flex items-center justify-center">
        <img class="w-full"
             alt="dsm_1"
             src="@/assets/images/image_2.png"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>