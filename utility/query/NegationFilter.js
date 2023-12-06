import { logicKeys, mKeys, negationKeys, sKeys } from './constants/QueryConstants'

import MFilter from './MFilter'
import SFilter from './SFilter'
import LogicFilter from './LogicFilter'

export default class NegationFilter {
  constructor(filter) {
    const key = Object.keys(filter)[0]
    if (logicKeys.includes(key)) {
      this.filter = new LogicFilter(filter)
    } else if (mKeys.includes(key)) {
      this.filter = new MFilter(filter)
    } else if (sKeys.includes(key)) {
      this.filter = new SFilter(filter[key])
    } else {
      this.filter = new NegationFilter(filter[key])
    }
  }

  evaluateDataOnFilter(data) {
    return !this.filter.evaluateDataOnFilter(data)
  }
}
