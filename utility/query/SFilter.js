export default class SFilter {
  constructor(filter) {
    const sKey = Object.keys(filter)[0];
    this.field = sKey;
    this.value = filter[sKey];
  }

  evaluateDataOnFilter(data) {
    const propertyVal = String(data[this.field]);
    const propertyValLength = propertyVal.length;
    const firstChar = this.value.slice(0, 1);
    const lastChar = this.value.slice(-1);
    if (firstChar === '*' && lastChar !== '*') {
      const strMatch = this.value.slice(1);
      return (
        strMatch === propertyVal.slice(propertyValLength - strMatch.length)
      );
    }
    if (firstChar !== '*' && lastChar === '*') {
      const strMatch = this.value.slice(0, this.value.length - 1);
      return strMatch === propertyVal.slice(0, strMatch.length);
    }
    if (firstChar === '*' && lastChar === '*') {
      const strMatch = this.value.slice(1, this.value.length - 1);
      return propertyVal.includes(strMatch);
    }
    return propertyVal === this.value;
  }
}
