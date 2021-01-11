<template>
  <div class="my-4">
    <h4 class="font-bold mb-2">{{ heading }}</h4>
    <p class="text-sm mb-2">{{ subheading }}</p>

    <div class="bg-white w-full p-4 shadow rounded-md">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlankCardWithExternalHeading',

  props: {
    heading: {
      required: true,
      type: String,
    },

    subheading: {
      required: false,
      type: String,
    },
  }
}
</script>