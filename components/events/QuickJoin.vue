<template>
  <div 
    v-if="loading"
    class="flex justify-center"
  >
    <swapping-squares-spinner
      :animation-duration="1000"
      :size="50"
      :color="'#2f6cc1'"
    />
  </div>

  <div
    v-else
    class="flex flex-col w-full"
  >
    <div class="flex items-center text-gray-600 text-xs">
      <span>Secure checkout powered by</span>
      <img class="inline w-10" src="~/assets/images/stripe.svg" alt="Stripe">
    </div>

    <div class="stripe-card-element shadow-md mt-2 mb-3 py-3 px-2 rounded-md bg-gray-200"></div>

    <button
      @click="processPayment"
      class="bg-brand-blue text-white text-center font-bold px-4 py-3 w-full rounded-md shadow-md hover:bg-brand-dark-blue"
    >
      Book Slot <span class="font-normal text-sm">( {{ this.$helpers.currency(eventPrice) }} )</span>
    </button>

    <span class="self-center text-center text-gray-600 text-sm my-2">or</span>

    <button class="bg-paypal px-4 py-3 w-full rounded-md shadow-md hover:bg-paypal-dark">
      <img class="inline w-18" src="~/assets/images/paypal.svg" alt="Paypal">
    </button>
  </div>
</template>

<script>
import Alert from '@/mixins/Alert';
import { SwappingSquaresSpinner } from 'epic-spinners';

export default {
  name: 'QuickJoin',

  components: {
    SwappingSquaresSpinner,
  },

  mixins: [
    Alert,
  ],

  props: {
    eventUuid: {
      required: true,
      type: String,
    },
    eventPrice: {
      required: true,
      type: Number,
    }
  },

  data() {
    return {
      loading: true,
      addPaymentStatus: 0,
      addPaymentStatusError: null,
      card: null,
      intentToken: null,
      paymentMethods: [],
    };
  },

  mounted() {
    this.setupStripe();
  },

  methods: {
    setupStripe() {
      this.card = this.$stripe.elements().create('card', {});
      this.$axios.get('/me/setup-intent')
        .then(response => {
          this.loading = false;
          this.intentToken = response.data;
          this.$nextTick(() => setTimeout(() => this.card.mount('.stripe-card-element'), 500));
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },

    processPayment() {
      this.addPaymentStatus = 1;

      return this.$stripe.confirmCardSetup(this.intentToken.client_secret, {
        payment_method: {
          card: this.card,
          billing_details: {
            name: this.$auth.user.full_name,
          }
        }
      }).then(response => {
        if (response.error) {
          this.addPaymentStatus = 3;
          this.addPaymentStatusError = response.error.message;
        } else {
          return response;
        }
      })
      .then(response => {
        this.storePaymentMethod(response.setupIntent.payment_method);
        this.addPaymentStatus = 2;
        this.card.clear();

        return response.setupIntent;
      })
      .then(response => response.payment_method)
      .then(paymentMethod => new Promise(resolve => setTimeout(() => resolve(paymentMethod), 1000)))
      .then(paymentMethod => this.$axios.post(`events/${this.eventUuid}/confirm-slot`, {
        payment_method_id: paymentMethod,
      }))
      .then(() => {
        this.$nuxt.refresh();
        this.showAlert('You have successfully confirmed your place for this event', 'success');
      })
      .catch(error => console.log(error));
    },

    storePaymentMethod(method) {
      this.$axios.post('/me/payment-methods', {
        payment_method_id: method,
      });
    },
  },
}
</script>

<style lang="scss">
  .stripe-card-element {
    * {
      font-family: 'Source Sans Pro';
      font-size: 16px;
      font-weight: 500;
    }
  }
</style>