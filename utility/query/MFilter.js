export default class MFilter {
  constructor(filter) {
    [this.comparator] = Object.keys(filter);
    const mKey = Object.keys(filter[this.comparator])[0];
    this.field = mKey;
    this.value = filter[this.comparator][mKey];
  }

  evaluateDataOnFilter(data) {
    if (this.comparator === 'LT') {
      return data[this.field] < this.value;
    }
    if (this.comparator === 'GT') {
      return data[this.field] > this.value;
    }
    return data[this.field] === this.value;
  }
}
