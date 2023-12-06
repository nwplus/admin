export default class SumGroup {
  constructor(applyKey, key) {
    this.applyKey = applyKey
    this.key = key
  }

  getApplyKey() {
    return this.applyKey
  }

  executeApplyRuleOnGroup(groupEntries) {
    let sum = 0
    groupEntries.forEach(entry => {
      sum += Number(entry[this.key])
    })
    return Number(sum.toFixed(2))
  }
}
