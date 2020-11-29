<template>
  <div class="flex flex-col items-center justify-center w-full px-20">
    <img src="~/assets/images/OpenRunWhite.svg" alt="OpenRun" class="block mx-auto h-6">
    <h1 class="text-white text-3xl tracking-wide">Create Account</h1>

    <div class="w-full mx-20 px-20">
      <FormulateForm
        @submit="submitHandler"
      >
        <div class="flex w-full mt-6">
          <div class="flex-col flex-1 mr-2">
            <label for="first_name" class="block text-xs uppercase font-bold text-white tracking-wider">First Name</label>
            <FormulateInput
              v-model="form.first_name"
              type="text"
              name="first_name"
              input-class="input input--on-bg-brand-blue w-full mt-1 mb-2 shadow"
            />
          </div>
          <div class="flex-col flex-1 ml-2">
            <label for="last_name" class="block text-xs uppercase font-bold text-white tracking-wider">Last Name</label>
            <FormulateInput
              v-model="form.last_name"
              type="text"
              name="last_name"
              input-class="input input--on-bg-brand-blue w-full mt-1 mb-2 shadow"
            />
          </div>
        </div>

        <label for="email" class="block text-xs uppercase font-bold text-white tracking-wider">Email Address</label>
        <FormulateInput
          v-model="form.email"
          type="email"
          name="email"
          input-class="input input--on-bg-brand-blue w-full mt-1 mb-2 shadow"
        />

        <hr class="my-4">

        <label for="password" class="block text-xs uppercase font-bold text-white tracking-wider">Password</label>
        <FormulateInput
          v-model="form.password"
          type="password"
          name="password"
          input-class="input input--on-bg-brand-blue w-full mt-1 mb-2 shadow"
        />
        
        <label for="password_confirmation" class="block text-xs uppercase font-bold text-white tracking-wider">Password Confirmation</label>
        <FormulateInput
          v-model="form.password_confirmation"
          type="password"
          name="password_confirmation"
          input-class="input input--on-bg-brand-blue w-full mt-1 mb-2 shadow"
        />

        <div class="flex mt-6">
          <button type="submit" class="bg-white flex-1 px-4 py-3 rounded-md font-bold text-brand-blue shadow">Sign Up</button>
        </div>

        <p class="flex text-white text-center justify-center my-3">or</p>
        
        <div class="flex">
          <button class="bg-white flex-1 px-4 py-3 rounded-md font-bold text-brand-blue shadow mr-2">
            <i class="social-icon social-icon--google"></i> Sign Up with Google
          </button>
          <button class="bg-white flex-1 px-4 py-3 rounded-md font-bold text-brand-blue shadow mr-2">
            <i class="social-icon social-icon--facebook"></i> Sign Up with Facebook
          </button>
        </div>
      </FormulateForm>
    </div>
  </div>
</template>

<script>
import Form from '@/classes/Form';

export default {
  layout: 'registration',

  data() {
    return {
      form: new Form({
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        password_confirmation: null,
      }),
    };
  },

  methods: {
    async submitHandler() {
      return await this.$axios.post('/auth/register', this.form.data())
        .then(response => {
          this.$auth.setUser(response.data.user);
          this.$auth.setToken('local', response.data.access_token);
        })
        .catch(error => console.log(error));
    }
  }
}
</script>