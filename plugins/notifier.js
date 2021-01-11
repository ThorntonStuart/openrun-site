export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage({ content = '', color = '' }) {
      store.commit('alert/showMessage', { content, color });
    }
  });
}