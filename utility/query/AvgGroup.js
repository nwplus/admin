export default class AvgGroup {
  constructor(applyKey, key) {
    this.applyKey = applyKey;
    this.key = key;
  }

  getApplyKey() {
    return this.applyKey;
  }

  executeApplyRuleOnGroup(groupEntries) {
    let sum = 0;
    groupEntries.forEach((entry) => {
      sum += entry[this.key];
    });
    const avg = sum / groupEntries.length;
    return Number(avg.toFixed(2));
  }
}
