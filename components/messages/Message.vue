<template>
  <div
    class="text-sm"
    :class="[
      { 'bg-brand-blue text-white rounded-full px-4 my-1 py-2 self-end': sentByMe },
      { 'bg-gray-300 rounded-full px-4 my-1 py-2 self-start': !sentByMe },
    ]"
  >
    {{ message.body }}
  </div>
</template>

<script>
export default {
  name: 'Message',

  props: {
    message: {
      required: true,
      type: Object,
    },
  },

  computed: {
    sentByMe() {
      return this.message.user_id === this.$auth.user.id;
    }
  }
}
</script>