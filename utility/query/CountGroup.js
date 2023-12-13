export default class CountGroup {
  constructor(applyKey, key) {
    this.applyKey = applyKey
    this.key = key
  }

  getApplyKey() {
    return this.applyKey
  }

  executeApplyRuleOnGroup(groupEntries) {
    const uniqueValues = []
    groupEntries.forEach(entry => {
      if (!uniqueValues.includes(entry[this.key])) {
        uniqueValues.push(entry[this.key])
      }
    })
    return uniqueValues.length
  }
}
