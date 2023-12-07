import {
  logicKeys,
  mKeys,
  // negationKeys,
  sKeys,
} from './constants/QueryConstants'

import MFilter from './MFilter'
import SFilter from './SFilter'
// eslint-disable-next-line import/no-cycle
import NegationFilter from './NegationFilter'

export default class LogicFilter {
  constructor(filter) {
    ;[this.comparator] = Object.keys(filter)
    this.filters = filter[this.comparator].map(f => {
      const key = Object.keys(f)[0]
      if (logicKeys.includes(key)) {
        return new LogicFilter(f)
      }
      if (mKeys.includes(key)) {
        return new MFilter(f)
      }
      if (sKeys.includes(key)) {
        return new SFilter(f[key])
      }
      return new NegationFilter(f[key])
    })
  }

  evaluateDataOnFilter(data) {
    if (this.comparator === 'AND') {
      for (const filter of this.filters) {
        if (!filter.evaluateDataOnFilter(data)) {
          return false
        }
      }
      return true
    }
    for (const filter of this.filters) {
      if (filter.evaluateDataOnFilter(data)) {
        return true
      }
    }
    return false
  }
}
