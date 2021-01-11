<template>
  <nuxt-link
    :to="`/events/${event.uuid}`"
    class="flex justify-between bg-white flex shadow rounded-md py-2 px-4"
  >
    <div class="flex main-content">
      <img
        :src="$helpers.sportIcon(event.sport.slug)"
        class="self-center w-8 h-8 mr-2"
        alt="Basketball"
      >
      <div class="flex items-center">
        <span class="text-brand-blue text-4xl font-semibold text-white mr-2">{{ eventDate }}</span>
        
        <div class="flex flex-col justify-center">
          <span class="font-bold text-sm text-brand-blue leading-4">{{ eventMonth }}</span>
          <span class="text-sm text-brand-blue leading-4">{{ eventDay }}</span>
        </div>
      </div>

      <div class="self-center ml-8">
        <p class="text-gray-700">
          <span class="font-semibold text-brand-blue text-lg">{{ event.title }} - </span>
          {{ eventStartTime }} - {{ eventEndTime }}
        </p>
        <p class="text-xs text-gray-700">
          <font-awesome-icon :icon="faMapMarkerAlt" class="mr-1"></font-awesome-icon>
          35 Fairbourne Drive, Timperley, Altrincham, Greater Manchester, WA15 6AT
        </p>
      </div>
    </div>
    
    <div class="flex justify-center items-center px-2">
      <div class="flex mx-2">
        <img
          class="w-8 h-8 rounded-full border-2 border-white object-cover"
          v-for="(record, index) in participantImageAvatars"
          :class="{ '-ml-3' : participantImageAvatars.length > 1 }"
          :key="index"
          :src="record.image"
          :alt="record.name"
        >
        <span
          v-if="surplusParticipants"
          class="flex items-center justify-center font-semibold text-gray-600 text-xs w-8 h-8 rounded-full bg-gray-200 border-2 border-white -ml-3"
        >
          +{{ surplusParticipants }}
        </span>
      </div>
      <div class="flex items-center">
        <span class="font-semibold leading-8 text-4xl text-brand-blue">{{ participantCount }}</span>
        <span class="text-sm text-brand-blue mx-1">/ {{ event.maximum_participants }}</span>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { take } from 'lodash';

export default {
  name: 'EventBarCard',

  props: {
    event: {
      required: true,
      type: Object,
    }
  },

  computed: {
    participantImageAvatars() {
      return take(this.event.participants.map(participant => ({
        image: participant.profile.image,
        name: participant.full_name,
      })), 3);
    },
    
    surplusParticipants() {
      return this.participantCount > 3 ? this.maximum_participants - this.participantCount - 3 : 0;
    },

    participantCount() {
      return this.event.participants.length;
    },

    eventStartTime() {
      return format(new Date(this.event.start_datetime), 'h:mma');
    },

    eventEndTime() {
      return format(new Date(this.event.end_datetime), 'h:mma');
    },

    eventDate() {
      return format(new Date(this.event.start_datetime), 'd');
    },

    eventMonth() {
      return format(new Date(this.event.start_datetime), 'LLLL');
    },

    eventDay() {
      return format(new Date(this.event.start_datetime), 'EEEE');
    },

    faMapMarkerAlt() {
      return faMapMarkerAlt;
    }
  }
}
</script>