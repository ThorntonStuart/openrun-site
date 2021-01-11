<template>
  <div>
    <div
      class="flex header-block bg-cover bg-center bg-no-repeat relative w-full h-64 items-end p-6"
      :style="headerBlockImage"
    >
      <div class="header-block__content flex justify-between w-full">
        <div>
          <div class="flex">
            <h1 class="text-white text-xxl font-semibold">{{ event.title }}</h1>
            <img class="w-8 ml-3" :src="$helpers.sportIcon(event.sport.slug)" :alt="event.sport.name">
          </div>
          <div>
            <span class="text-white">{{ eventFullDatetimeRange }}</span>
            <span class="text-white mx-2">•</span>
            <span class="text-white">{{ this.$helpers.currency(event.price) }}</span>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <div class="flex items-end mb-2">
            <span class="text-4xl text-white font-semibold leading-8 mr-1">{{ participantCount }}</span>
            <span class="text-white">/ {{ event.maximum_participants }}</span>
          </div>
          <div
            class="px-4 py-1 rounded-full text-white font-semibold text-xs text-center"
            :class="remainingSlotsColour"
          >
            {{ remainingSlots }} slots remaining
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-8 my-12">
      <div class="flex flex-col col-span-6 col-start-2">
        <Alert />

        <blank-card-with-external-heading
          heading="About this event"
          subheading="Find out more about this event"
        >
          <div class="flex flex-col">
            <span class="text-xs text-gray-600 uppercase font-semibold mb-1">Key Details</span>
            <table class="table-fixed">
              <tbody>
                <tr>
                  <td class="text-gray-600 uppercase text-sm w-1/4">Slot Price</td>
                  <td class="font-semibold text-sm">{{ this.$helpers.currency(event.price) }}</td>
                </tr>
                <tr>
                  <td class="text-gray-600 uppercase text-sm w-1/4">Indoor / Outdoor</td>
                  <td class="font-semibold text-sm">Indoor</td>
                </tr>
                <tr>
                  <td class="text-gray-600 uppercase text-sm w-1/4">Sport</td>
                  <td class="flex font-semibold text-sm">
                    {{ event.sport.name }}
                    <img class="w-3 ml-1" :src="$helpers.sportIcon(event.sport.slug)" :alt="event.sport.name">
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="fade-rule w-full mt-4 mb-4 mx-auto"></div>
            <p class="mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat dicta laborum maiores neque veritatis, error quod numquam quos voluptate ratione est illo, consequuntur nisi, blanditiis nostrum in odio itaque sint?</p>
            <p class="mb-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur mollitia ratione iste assumenda autem ab quam quibusdam rerum odit eum?</p>
          </div>
        </blank-card-with-external-heading>
        <div class="fade-rule w-full mt-4 mb-2 mx-auto"></div>

        <blank-card-with-external-heading
          heading="Players attending"
          subheading="View the players that have signed up to attend this event"
        >
        </blank-card-with-external-heading>
        <div class="fade-rule w-full mt-4 mb-2 mx-auto"></div>

        <blank-card-with-external-heading
          heading="Event host"
          subheading="Find out more about the user that is hosting this event"
        >
          <div class="flex items-center justify-between">
            <img class="w-10 h-10" :src="event.host.profile.image" :alt="event.host.full_name">

            <div class="flex flex-col">
              <span class="text-xs text-gray-600">Full Name</span>
              <span class="text-sm">{{ event.host.full_name }}</span>
            </div>

            <div class="flex flex-col">
              <span class="text-xs text-gray-600">Email</span>
              <span class="text-sm">{{ event.host.email }}</span>
            </div>

            <div class="flex flex-col">
              <span class="text-xs text-gray-600">Host Rating</span>
              <div class="flex">
                <font-awesome-icon :icon="faStar" class="text-yellow-500"></font-awesome-icon>
                <font-awesome-icon :icon="faStar" class="text-yellow-500"></font-awesome-icon>
                <font-awesome-icon :icon="faStar" class="text-yellow-500"></font-awesome-icon>
                <font-awesome-icon :icon="faStar" class="text-yellow-500"></font-awesome-icon>
                <font-awesome-icon :icon="faStar" class="text-gray-600"></font-awesome-icon>
              </div>
            </div>

            <button class="bg-brand-blue text-white font-bold px-4 py-2 rounded-md shadow-md">Contact</button>
          </div>
        </blank-card-with-external-heading>
        <div class="fade-rule w-full mt-4 mb-2 mx-auto"></div>
      </div>

      <div class="flex flex-col col-span-4 2xl:col-span-3">
        <blank-card class="flex flex-col py-8" v-if="authenticatedUserIsParticipant">
          <img class="self-center w-12 mb-4" src="~/assets/images/check.svg" alt="Check">
          <span class="font-bold">You're attending!</span>
          <p class="text-sm">You have confirmed your slot for this session.</p>

          <hr class="my-4">

          <p class="text-sm">This event starts at <span class="font-bold">*address*</span> at <span class="font-bold">{{ $helpers.formatDate(this.event.start_datetime, 'HH:mm') }}</span>. Please try to arrive around 10 minutes prior to the start of the session.</p>
        </blank-card>
        <blank-card-with-external-heading
          v-else
          heading="Quick join this event"
          subheading="Easily confirm your attendance at this event using the quick-join feature below"
        >
          <quick-join
            :event-uuid="event.uuid"
            :event-price="event.price"
          />
        </blank-card-with-external-heading>
      </div>
    </div>
  </div>
</template>

<script>
import AlertComponent from '../../components/global/Alert';
import BlankCardWithExternalHeading from '../../components/cards/BlankCardWithExternalHeading.vue';
import QuickJoin from '../../components/events/QuickJoin.vue';
import basketballIndoorImage from 'assets/images/basketball-indoor.jpg';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'lodash';
import BlankCard from '../../components/cards/BlankCard.vue';

export default {
  components: {
    AlertComponent,
    BlankCard,
    BlankCardWithExternalHeading,
    QuickJoin,
  },

  async asyncData({ params, $repository }) {
    return await $repository.events.show(params.id)
      .then(response => ({ event: response.data.event }))
      .catch(error => console.log(error));
  },

  computed: {
    authenticatedUserIsParticipant() {
      return filter(this.event.participants, participant => this.$auth.user.uuid === participant.uuid).length;
    },

    headerBlockImage() {
      return { backgroundImage: `url(${basketballIndoorImage})` };
    },

    eventFullDatetimeRange() {
      return this.$helpers.formatDate(this.event.start_datetime, 'EEEE, do MMMM')
        + ' - '
        + this.$helpers.formatDate(this.event.start_datetime, 'HH:mm')
        + ' - '
        + this.$helpers.formatDate(this.event.end_datetime, 'HH:mm');
    },

    participantCount() {
      return this.event.participants.length;
    },

    remainingSlots() {
      return this.event.maximum_participants - this.participantCount;
    },
    
    remainingSlotsColour() {
      if (this.remainingSlots <= 3) {
        return 'bg-red-500';
      }

      if (this.remainingSlots <= 5) {
        return 'bg-yellow-500';
      }

      return 'bg-green-500';
    },

    faStar() {
      return faStar;
    },
  }
}
</script>

<style lang="scss" scoped>
  .header-block {
    &__content {
      z-index: 10;
    }

    &:after {
      background-image: linear-gradient(transparent, #000000);
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: .7;
      z-index: 1;
    }
  }

  .fade-rule {
    background-color: #9CA3AF;
    background-image: -webkit-linear-gradient(left , white 2%, #9CA3AF 50%, white 98%);
    height: 1px;
  }
</style>