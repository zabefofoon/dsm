<template>
  <div class="project-skeletor"
       :style="{width: width, height: height}"></div>
</template>

<script setup>
defineProps({
  width: {type: String, default: '100px'},
  height: {type: String, default: '100px'}
})
</script>

<style scoped lang="scss">
$background: rgba(245, 245, 245, 1);
$foreground: rgba(210, 210, 210, .2);

.project-skeletor {
  position: relative;
  background-image: linear-gradient(to right, $background 0%, $foreground 20%, $background 100%);

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, $background 0%, $foreground 20%, $background 100%);
    animation: shimmer 100s linear infinite;
  }
}

@keyframes shimmer {
  0% {
    background-position: -9999px;
  }
  100% {
    background-position: 9999px;
  }
}
</style>