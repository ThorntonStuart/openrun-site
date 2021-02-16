const endpoint = '/addresses/lookup';

export default ($axios) => ({
  store(payload) {
    return $axios.post(`${endpoint}`, payload);
  }
});