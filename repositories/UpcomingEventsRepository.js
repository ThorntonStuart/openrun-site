const endpoint = '/me/upcoming-events';

export default ($axios) => ({
    index() {
        return $axios.get(`${endpoint}`);
    }
});