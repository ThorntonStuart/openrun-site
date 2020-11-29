export default class Form {
  constructor(data) {
    this.originalData = data;

    for (let field in data) {
      this[field] = data[field];
    }
  }

  data() {
    let data = Object.assign({}, this);
    delete data.originalData;
    return data;
  }

  reset() {
    for (let field in this.originalData) {
      this[field] = null;
    }
  }
}
