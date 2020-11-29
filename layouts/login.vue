<template>
  <div class="bg-brand-blue">
    <div class="flex h-screen">
      <div class="flex flex-col justify-center bg-white w-2/5">
        <Nuxt />
      </div>
      <div
        class="w-3/5 bg-cover bg-center bg-no-repeat"
        :style="{ 'background-image': `url(${require('@/assets/images/LoginBackground.jpg')})` }"
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>