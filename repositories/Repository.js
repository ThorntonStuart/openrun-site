import UpcomingEventsRepository from './UpcomingEventsRepository';
import ConversationsRepository from './ConversationsRepository';
import EventsRepository from './EventsRepository';
import AddressLookupRepository from './AddressLookupRepository';

export default ($axios) => ({
    address_lookup: AddressLookupRepository($axios),
    conversations: ConversationsRepository($axios),
    events: EventsRepository($axios),
    upcoming_events: UpcomingEventsRepository($axios),
});