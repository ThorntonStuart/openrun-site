const endpoint = '/me/conversations';

export default ($axios) => ({
  index() {
    return $axios.get(`${endpoint}`);
  }
});