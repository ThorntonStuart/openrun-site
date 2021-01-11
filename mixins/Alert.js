export default {
  methods: {
    showAlert(content, color) {
      this.$notifier.showMessage({
        content: content,
        color: color,
      });
    }
  }
}