<template>
  <div class="flex flex-col justify-center w-full px-20">
    <img src="~/assets/images/OpenRun.svg" alt="OpenRun" class="block mx-auto mb-10 h-10">
    <h1 class="text-3xl tracking-wide">Log in</h1>
    <p>Sign in to OpenRun to access your account area and sign up for games</p>

    <FormulateForm @submit="submitHandler" class="mt-6">
      <label for="email" class="block text-xs uppercase font-bold tracking-wider">Email Address</label>
      <FormulateInput
        v-model="form.email"
        type="email"
        name="email"
        input-class="input w-full mt-1 mb-6 shadow"
      />

      <label for="password" class="block text-xs uppercase font-bold tracking-wider">Password</label>
      <FormulateInput
        v-model="form.password"
        type="password"
        name="password"
        input-class="input w-full mt-1 mb-6 shadow"
      />

      <div class="flex mt-4">
        <button type="submit" class="bg-brand-blue flex-1 px-4 py-3 rounded-md font-bold text-white shadow">Log in</button>
      </div>

      <p class="flex text-center justify-center my-3">or</p>
    </FormulateForm>
    
    <div class="flex flex-col">
      <button
        @click="socialAuthenticate('google')"
        class="bg-white px-4 py-3 rounded-md font-bold text-gray-700 shadow my-2"
      >
        <i class="social-icon social-icon--google"></i> Log in with Google
      </button>
      <button
        @click="socialAuthenticate('facebook')"
        class="bg-white px-4 py-3 rounded-md font-bold text-gray-700 shadow my-2"
      >
        <i class="social-icon social-icon--facebook"></i> Log in with Facebook
      </button>
    </div>
  </div>
</template>

<script>
import Form from '@/classes/Form';

export default {
  layout: 'login',

  data() {
    return {
      form: new Form({
        email: null,
        password: null,
      }),
    };
  },

  methods: {
    async submitHandler() {
      return this.$auth.login({ data: this.form.data() })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    },

    socialAuthenticate(provider) {
      window.location.href = `${this.$axios.defaults.baseURL}auth/login/${provider}`;
    }
  }
}
</script>