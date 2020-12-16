import UpcomingEventsRepository from '~/repositories/UpcomingEventsRepository';
import ConversationsRepository from './ConversationsRepository';

export default ($axios) => ({
    conversations: ConversationsRepository($axios),
    upcoming_events: UpcomingEventsRepository($axios),
});