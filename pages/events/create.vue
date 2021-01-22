<template>
  <div class="grid grid-cols-12 gap-8 my-12 w-full">
    <div class="flex flex-col col-span-6 col-start-2">
      <h1 class="font-semibold">Create new run</h1>

      <blank-card-with-internal-heading
        heading="Location Details"
      >
        <address-lookup />
      </blank-card-with-internal-heading>
    </div>
  </div>
</template>

<script>
import BlankCardWithInternalHeading from '../../components/cards/BlankCardWithInternalHeading';
import AddressLookup from '../../components/shared/AddressLookup.vue';

export default {
  components: {
    AddressLookup,
    BlankCardWithInternalHeading,
  },
}
</script>