<template>
  <div class="bg-white">
    <div class="flex h-screen">
      <div class="flex flex-col justify-center bg-brand-blue w-3/5">
        <Nuxt />
      </div>
      <div
        class="w-2/5 bg-contain bg-center bg-no-repeat" 
        :style="{ 'background-image': `url(${require('@/assets/images/RegistrationBackground.jpg')})` }"
      >
      </div>
    </div>
  </div>
</template>