<template>
  <div class="container">
    <div v-if="$auth.loggedIn" class="p-4">
      <h5 class="mb-2">Your Upcoming Events</h5>
      <hr class="mb-3">

      <EventBarCard
        v-for="event in upcoming_events"
        :key="event.uuid"
        :event="event"
      />
    </div>
  </div>
</template>

<script>
import EventBarCard from '@/components/cards/EventBarCard';

export default {
  async asyncData({ $auth, $repository }) {
    if (!$auth.loggedIn) {
      return {};
    }

    const upcomingEvents = await $repository.upcoming_events.index();

    return {
      upcoming_events: upcomingEvents.data.data
    };
  },

  components: {
    EventBarCard,
  },
}
</script>