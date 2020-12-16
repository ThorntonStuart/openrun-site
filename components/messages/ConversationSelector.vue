<template>
  <li
    :class="[
      { 'bg-brand-blue text-white' : active },
      { 'hover:bg-gray-100': !active },
    ]"
    class="flex py-3 px-4 text-sm items-center cursor-pointer justify-between"
  >
    <div class="flex items-center">
      <img
        class="w-8 h-8 rounded-full border-2 border-white object-cover mr-2" 
        :src="opposingParticipant.user.profile.image"
        :alt="opposingParticipant.user.full_name"
      >
      {{ opposingParticipant.user.full_name }}
    </div>
    <div class="flex items-center">
      <span class="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
      <span
        class="text-xs text-uppercase"
        :class="{ 'text-white': conversation.active }"
      >
        Online
      </span>
    </div>
  </li>
</template>

<script>
import { first } from 'lodash';

export default {
  name: 'ConversationSelector',

  props: {
    conversation: {
      required: true,
      type: Object,
    },

    active: {
      required: true,
      type: Boolean,
    },
  },

  computed: {
    opposingParticipant() {
      return first(this.conversation.participants.filter(
        participant => participant.user_id !== this.$auth.user.id
      ));
    }
  },
}
</script>