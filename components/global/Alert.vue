<template>
  <div
    class="border rounded p-4 text-sm shadow"
    v-show="show"
    :class="`backround-${color} border-${color}`">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Alert',

  data() {
    return {
      show: false,
      message: null,
      color: null,
    };
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'alert/showMessage') {
        this.message = state.alert.content;
        this.color = state.alert.color;
        this.show = true;
      }
    });
  },
}
</script>