const endpoint = '/events';

export default ($axios) => ({
  show(id) {
    return $axios.get(`${endpoint}/${id}`);
  },
});