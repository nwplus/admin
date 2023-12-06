export default class MaxGroup {
  constructor(applyKey, key) {
    this.applyKey = applyKey;
    this.key = key;
  }

  getApplyKey() {
    return this.applyKey;
  }

  executeApplyRuleOnGroup(groupEntries) {
    let max = Number.NEGATIVE_INFINITY;
    groupEntries.forEach((entry) => {
      max = Math.max(max, Number(entry[this.key]));
    });
    return max;
  }
}
