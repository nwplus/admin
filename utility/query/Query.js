import {
  logicKeys,
  mKeys,
  sKeys,
  // negationKeys,
} from './constants/QueryConstants';
import LogicFilter from './LogicFilter';
import MFilter from './MFilter';
import SFilter from './SFilter';
import NegationFilter from './NegationFilter';
import MaxGroup from './MaxGroup';
import MinGroup from './MinGroup';
import AvgGroup from './AvgGroup';
import CountGroup from './CountGroup';
import SumGroup from './SumGroup';

const createFilter = (filterKeys, filter) => {
  const key = filterKeys[0];
  if (logicKeys.includes(key)) {
    return new LogicFilter(filter);
  }
  if (mKeys.includes(key)) {
    return new MFilter(filter);
  }
  if (sKeys.includes(key)) {
    return new SFilter(filter[key]);
  }
  return new NegationFilter(filter[key]);
};

const createGroup = (applyKey, func, field) => {
  if (func === 'MAX') {
    return new MaxGroup(applyKey, field);
  }
  if (func === 'MIN') {
    return new MinGroup(applyKey, field);
  }
  if (func === 'AVG') {
    return new AvgGroup(applyKey, field);
  }
  if (func === 'COUNT') {
    return new CountGroup(applyKey, field);
  }
  return new SumGroup(applyKey, field);
};

const createQuery = (query) => {
  const queryResult = {
    dataset: '',
    columns: [],
    group: '',
    apply: undefined,
    order: undefined,
    filter: undefined,
  };

  const order = query.ORDER;
  const group = query.GROUPBY;
  const filter = query.WHERE;

  if (filter) {
    const filterKeys = Object.keys(filter);
    if (filterKeys.length === 1) {
      queryResult.filter = createFilter(filterKeys, filter);
    }
  }

  if (group) {
    queryResult.group = group.COLUMN;
    queryResult.apply = group.APPLY.map((rule) => {
      const applyKey = Object.keys(rule)[0];
      const func = Object.keys(rule[applyKey])[0];
      const field = rule[applyKey][func];
      return createGroup(applyKey, func, field);
    });
  }
  if (order) {
    queryResult.order = order;
  }
  return queryResult;
};

const equateGroupValues = (a, b) => {
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

const aggregateData = (data, group, apply) => {
  let aggregatedData = [];
  if (group && apply) {
    const groups = {};
    const groupValues = [];
    data.forEach((entry) => {
      const groupEntryValues = [entry[group]];
      let index = 0;
      while (index < groupValues.length) {
        if (equateGroupValues(groupValues[index], groupEntryValues)) {
          break;
        }
        index += 1;
      }
      if (index < groupValues.length) {
        groups[String(index)].push(entry);
      } else {
        groups[String(groupValues.length)] = [entry];
        groupValues.push(groupEntryValues);
      }
    });
    const groupKeys = Object.keys(groups);
    groupKeys.forEach((groupKey) => {
      const groupEntries = groups[groupKey];
      const applyFields = {};
      apply.forEach((rule) => {
        const applyKey = rule.getApplyKey();
        applyFields[applyKey] = rule.executeApplyRuleOnGroup(groupEntries);
      });
      aggregatedData.push({
        [group]: groups[groupKey][0][group],
        ...applyFields,
      });
    });
  } else {
    aggregatedData = data;
  }
  return aggregatedData;
};

const executeQuery = (query, data) => {
  if (Object.keys(query).length === 0) return data;
  let result = [...data];
  const { group, apply, order, filter } = query;
  if (filter) {
    result = result.filter((dataEntry) => {
      return filter.evaluateDataOnFilter(dataEntry);
    });
  }
  result = aggregateData(result, group, apply);
  if (order) {
    const direction = order.dir;
    const { keys } = order;
    result = result.sort((a, b) => {
      for (const key of keys) {
        if (a[key] > b[key]) {
          return direction === 'UP' ? 1 : -1;
        }
        if (a[key] < b[key]) {
          return direction === 'DOWN' ? 1 : -1;
        }
      }
      return 0;
    });
  }
  return result;
};

const calculateColumn = (key, func, data) => {
  if (func === 'Count') return data.length;

  let result = 0;
  if (func === 'Sum') {
    data.forEach((entry) => {
      if (typeof entry[key] === 'number') {
        result += entry[key];
      }
    });
    return result;
  }

  if (func === 'Average') {
    let count = 0;
    data.forEach((entry) => {
      if (typeof entry[key] === 'number') {
        result += entry[key];
        count += 1;
      }
    });
    return (result / count).toFixed(1);
  }

  if (func === 'Max') {
    result = Number.MIN_SAFE_INTEGER;
    data.forEach((entry) => {
      if (typeof entry[key] === 'number') {
        result = Math.max(result, entry[key]);
      }
    });
    if (result === Number.MIN_SAFE_INTEGER) return 'Error';
    return result;
  }

  if (func === 'Min') {
    result = Number.MAX_SAFE_INTEGER;
    data.forEach((entry) => {
      if (typeof entry[key] === 'number') {
        result = Math.min(result, entry[key]);
      }
    });
    if (result === Number.MAX_SAFE_INTEGER) return 'Error';
    return result;
  }

  return -1;
};

export { createQuery, executeQuery, calculateColumn };
