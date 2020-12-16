<template>
  <div class="col-span-2 flex flex-col justify-end">
    <div class="flex flex-col flex-grow justify-end px-4 py-4">
      <Message 
        v-for="message in messages"
        :key="message.uuid"
        :message="message"
      />
    </div>
    <div class="flex border-t border-gray-300 w-full p-2">
      <div class="bg-gray-200 flex flex-grow rounded-lg py-2 px-3">
        <input
          v-model="message"
          class="input--no-padding flex-grow text-sm"
          type="text"
        >
        <button
          @click="sendMessage"
          class="bg-brand-blue text-white rounded-lg text-sm px-2 py-2"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from '@/components/messages/Message';
import Pusher from 'pusher-js';

export default {
  name: 'Conversation',

  components: {
    Message,
  },

  fetchOnServer: false,

  props: {
    recipientUserId: {
      required: true,
      type: Number,
    },

    conversationUuid: {
      required: true,
      validator: prop => typeof prop === 'string' || prop === null,
    },
  },

  async fetch() {
    if (this.uuid) {
      await this.$axios.get(`/me/conversations/${this.uuid}`)
        .then(response => {
          const { messages, participants } = response.data.data;

          this.messages = messages.map(message => ({
            uuid: message.uuid,
            user_id: message.user_id,
            body: message.body,
            created_at: message.created_at,
          }));

          this.participants = participants;
        });
    }
  },

  mounted() {
    this.$echo.channel(`conversations.${this.uuid}`)
      .listen('.message.sent', event => {
        this.messages.push({
          body: event.message.body,
          created_at: event.message.created_at,
          user_id: event.message.user_id,
          uuid: event.message.uuid,
        });
      });
  },

  data() {
    return {
      uuid: this.conversationUuid,
      message: null,
      messages: [],
      participants: [],
    };
  },

  methods: {
    async sendMessage() {
      const payload = {
        message: this.message,
        conversation_uuid: this.uuid,
      };

      if (this.uuid === null) {
        payload['recipients'] = this.recipientUserId;
      } 

      return await this.$axios.post(`/me/messages`, payload)
        .then(response => {
          this.message = null;
          this.uuid = response.data.data.uuid;
        })
        .catch(error => console.log(error));
    },
  }
}
</script>