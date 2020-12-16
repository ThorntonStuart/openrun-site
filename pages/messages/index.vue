<template>
  <div class="grid grid-cols-3 bg-white m-8 w-full rounded-lg shadow-lg">
    <div class="flex flex-col border-r border-gray-300">
      <div class="w-full py-4 px-4 border-b border-gray-300">
        <input
          v-model="search_term"
          class="input w-full"
          placeholder="Find a user..."
          type="text"
        >
      </div>
      <div
        class="flex flex-col flex-grow"
        :class="{ 'justify-center items-center': noConversationsAvailable && !search_term }"
      >
        <div v-if="conversations.length">
          <ul>
            <ConversationSelector
              v-for="conversation in conversations"
              :key="conversation.uuid"
              :conversation="conversation"
              :active="conversation.uuid === activeConversation.uuid"
            />
          </ul>
        </div>
        <div v-else-if="search_term">
          <ul v-if="searchResults">
            <li
              @click="createConversation(record)"
              class="flex py-3 px-4 text-sm items-center hover:bg-gray-100 cursor-pointer"
              v-for="record in searchResults"
              :key="record.id"
            >
              <img
                class="w-8 h-8 rounded-full border-2 border-white object-cover mr-2" 
                :src="record.profile_image_url" alt=""
              >
              {{ record.full_name }}
            </li>
          </ul>
          <div v-else></div>
        </div>
        <div class="flex flex-col items-center" v-else-if="noConversationsAvailable && !search_term">
          <div class="flex items-center justify-center bg-gray-200 h-16 w-16 mb-2 rounded-full">
            <font-awesome-icon :icon="faEnvelope" class="text-lg text-gray-600"></font-awesome-icon>
          </div>
          <span class="text-gray-600">No active conversations</span>
        </div>
      </div>
    </div>
  
    <Conversation
      v-if="activeConversation"
      :conversation-uuid="activeConversation.uuid"
      :recipient-user-id="getNonActiveParticipant(activeConversation.participants).id"
    />
  </div>
</template>

<script>
import Conversation from '@/components/messages/Conversation';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { first } from 'lodash';

export default {
  async asyncData({ $repository }) {
    return await $repository.conversations.index()
      .then(response => ({ conversations: response.data.data }))
      .catch(error => console.log(error));
  },

  data() {
    return {
      activeConversation: null,
      search_term: null,
      awaitingSearch: false,
      searchResults: [],
    };
  },

  computed: {
    noSearchResults() {
      return !this.searchResults.length;
    },

    noConversationsAvailable() {
      return !this.conversations.length;
    },

    faEnvelope() {
      return faEnvelope;
    },
  },

  created() {
    if (this.conversations) {
      this.activeConversation = first(this.conversations);
    }
  },

  methods: {
    async userSearch(searchTerm) {
      return await this.$axios.post(`/search/users`, { search: searchTerm })
        .then(response => this.searchResults = response.data.hits)
        .catch(error => console.log(error));
    },

    createConversation(record) {
      this.conversations.push({
        active: true,
        recipients: record.id,
        user: record,
        uuid: null,
      });

      this.search_term = null;
    },
    
    getNonActiveParticipant(participants) {
      return first(participants.filter(
        participant => participant.user_id !== this.$auth.user.id)
      );
    },
  },

  watch: {
    search_term: function (value) {
      if (!this.awaitingSearch && this.search_term) {
        setTimeout(() => {
          this.userSearch(value);
          this.awaitingSearch = false;
        }, 1000);
        this.awaitingSearch = true;
      }
    }
  }
}
</script>