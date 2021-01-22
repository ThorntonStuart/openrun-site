<template>
  <div class="flex flex-wrap items-stretch w-full my-4 relative">
    <input
      v-model="postcode"
      type="text"
      class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-r-0 h-10 border-gray-400 rounded rounded-r-none px-3 relative outline-none"
      placeholder="Search Postcode"
    >
    
    <div class="flex -mr-px">
      <span
        v-if="postcode"
        @click="clearPostcode"
        class="flex items-center leading-normal border border-l-0 px-3 whitespace-no-wrap bg-brand-dark-blue border-brand-dark-blue text-sm cursor-pointer outline-none"
      >
        <font-awesome-icon :icon="faTimes" class="text-white"></font-awesome-icon>
      </span>

      <span class="flex items-center leading-normal rounded rounded-l-none border border-l-0 px-3 whitespace-no-wrap bg-brand-blue border-brand-blue text-sm outline-none hover:bg-brand-light-blue hover:border-brand-light-blue cursor-pointer">
        <font-awesome-icon :icon="faSearch" class="text-white"></font-awesome-icon>
      </span>
    </div>
  </div>
</template>

<script>
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'AddressLookup',

  data() {
    return {
      postcode: null,
    };
  },

  computed: {
    faSearch() {
      return faSearch;
    },

    faTimes() {
      return faTimes;
    }
  },

  methods: {
    clearPostcode() {
      this.postcode = null;
    },
  },
}
</script>