<template>
</template>

<script>
export default {
  data() {
    return {
      token: this.$route.query.token || null,
    };
  },

  mounted() {
    this.$auth.setUserToken(this.token);
    this.$router.push('/');
  }
}
</script>