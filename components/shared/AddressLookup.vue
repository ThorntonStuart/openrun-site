<template>
  <div class="flex flex-col">
    <div class="flex flex-col mt-4 mb-2">
      <span class="text-xs text-gray-600 mb-1">Please enter a postcode only</span>

      <form class="flex flex-wrap items-stretch w-full relative">
        <input
          v-model="form.search"
          type="text"
          class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-r-0 h-10 border-gray-400 rounded rounded-r-none px-3 relative outline-none focus:outline-none"
          placeholder="Search Postcode"
          :disabled="selectedAddress"
        >
        
        <div class="flex -mr-px">
          <button
            @click.prevent="clearAll"
            v-if="form.search"
            class="flex items-center leading-normal border border-l-0 px-3 whitespace-no-wrap bg-brand-dark-blue border-brand-dark-blue text-sm cursor-pointer outline-none focus:outline-none"
          >
            <font-awesome-icon
              :icon="faTimes"
              class="text-white"
            ></font-awesome-icon>
          </button>

          <button
            @click.prevent="searchPostcode"
            class="flex items-center leading-normal rounded rounded-l-none border border-l-0 px-3 whitespace-no-wrap bg-brand-blue border-brand-blue text-sm outline-none focus:outline-none hover:bg-brand-light-blue hover:border-brand-light-blue cursor-pointer"
          >
            <font-awesome-icon
              :icon="faSearch"
              class="text-white"
            ></font-awesome-icon>
          </button>
        </div>
      </form>
    </div>

    <div
      v-if="addresses.length"
      class="flex flex-col rounded border border-gray-400 h-32 overflow-scroll"
    >
      <div
        @click="selectAddress(address)"
        v-for="address in addresses"
        :key="address.id"
        class="flex address-item px-3 py-2 text-sm hover:bg-brand-lighter-blue cursor-pointer justify-between items-center"
      >
        {{ address.inline_address }}
        <font-awesome-icon
          :icon="faArrowRight"
          class="text-transparent"
        ></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { faArrowRight, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Form from '../../classes/Form';

export default {
  name: 'AddressLookup',

  data() {
    return {
      addresses: [],
      selectedAddress: null,
      form: new Form({
        search: null,
      }),
    };
  },

  computed: {
    faSearch() {
      return faSearch;
    },

    faTimes() {
      return faTimes;
    },

    faArrowRight() {
      return faArrowRight;
    }
  },

  methods: {
    selectAddress(address) {
      this.selectedAddress = address;
      this.form.search = address.short_address;
      this.addresses = [];
      this.$emit('address-selected', address.id);
    },

    searchPostcode() {
      this.$repository.address_lookup.store(this.form.data())
        .then(response => this.addresses = response.data.data)
        .catch(error => console.log(error));
    },

    clearAll() {
      this.selectedAddress = null;
      this.form.reset();
    },
  },
}
</script>

<style lang="scss">
  input:disabled {
    @apply bg-gray-300;
  }

  .address-item:hover {
    .fa-arrow-right {
      color: #2f6cc1;
    }
  }
</style>