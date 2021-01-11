import UpcomingEventsRepository from './UpcomingEventsRepository';
import ConversationsRepository from './ConversationsRepository';
import EventsRepository from './EventsRepository';

export default ($axios) => ({
    conversations: ConversationsRepository($axios),
    events: EventsRepository($axios),
    upcoming_events: UpcomingEventsRepository($axios),
});