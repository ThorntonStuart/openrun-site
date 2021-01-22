<template>
  <div class="my-4">
    <div class="bg-white w-full p-4 shadow rounded-md">
      <h4 class="font-bold mb-2">{{ heading }}</h4>
      <hr>
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
  }
}
</script>