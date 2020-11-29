import UpcomingEventsRepository from '~/repositories/UpcomingEventsRepository';

export default ($axios) => ({
    upcoming_events: UpcomingEventsRepository($axios),
});