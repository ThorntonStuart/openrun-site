<template>
  <div class="bg-gray-200 h-screen">
    <header class="navbar bg-brand-blue w-full items-center">
      <div class="mx-auto pl-6 h-16 flex justify-between items-center">
        <nuxt-link to="/">
          <img src="~/assets/images/OpenRunWhite.svg" alt="OpenRun" class="navbar-logo h-8">
        </nuxt-link>
        <div class="links">
          <div class="nav-links">
            <div class="nav-item">
            </div>
          </div>
        </div>
        <div
          @click="dropdown = !dropdown"
          :class="[
            { 'bg-brand-dark-blue' : dropdown },
            { 'h-full hover:bg-brand-dark-blue cursor-pointer': $auth.loggedIn }
          ]"
          class="flex px-6 z-50"
        >
          <template v-if="$auth.loggedIn">
            <div class="flex items-center">
              <div
                class="border-2 bg-contain bg-center bg-white w-10 h-10 rounded-full mr-2"
                :style="[
                  $auth.user.profile
                    ? { 'background-image': `url(${$auth.user.profile.image})` }
                    : { 'background-image': `url()` }
                ]"
              ></div>
              <p class="mr-2 text-white text-sm">Welcome back, {{ $auth.user.first_name }}</p>
              <font-awesome-icon :icon="faChevronDown" class="text-white"></font-awesome-icon>
            </div>
          </template>
          <template v-else>
            <nuxt-link class="bg-brand-blue border border-white rounded py-3 px-6 text-white text-sm mx-1 shadow" to="/login">Log In</nuxt-link>
            <nuxt-link class="bg-white border border-white rounded py-3 px-6 text-brand-blue text-sm ml-1 shadow" to="/register">Sign Up</nuxt-link>
          </template>
        </div>
      </div>
    </header>
    <div
      v-show="dropdown"
      class="flex flex-col bg-brand-dark-blue w-1/4 absolute right-0"
    >
      <nuxt-link class="dropdown-link" to="/profile">Settings</nuxt-link>
      <nuxt-link class="dropdown-link" to="/game-history">Game History</nuxt-link>
      <a class="dropdown-link" href="" @click.prevent="logOut">Log Out</a>
    </div>
    <div class="md:flex flex-col md:flex-row h-screen-custom w-full bg-gray-100">
      <div class="flex flex-col w-full md:w-64 text-gray-700 bg-white flex-shrink-0 bg-white">
        <nav class="flex-grow md:block px-2 py-2 pb-4 md:pb-0 md:overflow-y-auto">
          <nuxt-link to="/" class="flex-shrink-0 px-2 py-3 flex flex-row items-center rounded-md hover:bg-brand-lighter-blue shadow">
            <font-awesome-icon :icon="faTachometerAlt" class="text-brand-light-blue"></font-awesome-icon>
            <span class="text-brand-light-blue ml-3 text-sm">Dashboard</span>
          </nuxt-link>
        </nav>
        <div class="border-t px-4 py-3">
          <font-awesome-icon :icon="faDoorOpen" class="text-brand-light-blue"></font-awesome-icon>
          <span class="text-brand-light-blue ml-3 text-sm">Log Out</span>
        </div>
      </div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { faChevronDown, faDoorOpen, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

export default {
  data() {
    return {
      dropdown: false,
    };
  },

  computed: {
    faChevronDown() {
      return faChevronDown;
    },

    faDoorOpen() {
      return faDoorOpen;
    },

    faTachometerAlt() {
      return faTachometerAlt;
    },
  },

  methods: {
    logOut() {
      this.$auth.logout();
      this.dropdown = false;
    }
  }
}
</script>

<style lang="scss">
  .dropdown-link {
    @apply text-white text-sm px-4 py-3;

    &:hover {
      @apply bg-brand-blue;
    }
  }
</style>