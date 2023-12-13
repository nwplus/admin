export default class MinGroup {
  constructor(applyKey, key) {
    this.applyKey = applyKey
    this.key = key
  }

  getApplyKey() {
    return this.applyKey
  }

  executeApplyRuleOnGroup(groupEntries) {
    let min = Number.POSITIVE_INFINITY
    groupEntries.forEach(entry => {
      min = Math.min(min, Number(entry[this.key]))
    })
    return min
  }
}
