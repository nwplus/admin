import { useState, useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { CSVLink } from 'react-csv'
import { getHackathonPaths, getHackathons, getHackerInfo } from '../../utility/firebase'
import Page from '../../components/page'
import Button from '../../components/button'
import Menu from '../../components/menu'
import { HACKATHON_NAVBAR, CHECK, CLOSE, COLOR } from '../../constants'
import { TableWrapper, TableHeader, TableContent, TableRow, TableData } from '../../components/table'
import { createQuery, executeQuery, calculateColumn } from '../../utility/query/Query'

const tableOptions = ['Applicants', 'Projects', 'DayOf']

const groupByFunctions = [
  { label: 'Count', value: 'COUNT' },
  { label: 'Sum', value: 'SUM' },
  { label: 'Average', value: 'AVERAGE' },
  { label: 'Max', value: 'MAX' },
  { label: 'Min', value: 'MIN' },
]

const filterFunctions = [
  { label: 'matches', value: 'IS' },
  { label: 'does not match', value: 'NIS' },
  { label: 'equals', value: 'EQ' },
  { label: 'is not equal to', value: 'NEQ' },
  { label: 'greater than', value: 'GT' },
  { label: 'less than', value: 'LT' },
]

const calculateFunctions = ['Count', 'Sum', 'Average', 'Max', 'Min']

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 24px;
`

const TableOptionsButtons = styled.ul`
  display: flex;
  margin: auto;
`

const ExportButton = styled.div`
  display: flex;
  justify-content: right;
`

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`

const FilterPills = styled.div`
  display: flex;
  gap: 4px;
`

const Pill = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 4px 12px 4px 8px;
  border: 1px solid black;
  border-radius: 32px;
`

const FilterOptions = styled.div`
  display: flex;
`

const Selection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`

const CalculateResult = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  font-family: HK Grotesk;
  font-size: 14px;
  font-weight: 600;
`

const Calculate = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  font-family: HK Grotesk;
`

export default function HackerInfo({ id, hackathons }) {
  const [unfilteredData, setUnfilteredData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [currTable, setCurrTable] = useState('Applicants')
  const [unfilteredTableKeys, setUnfilteredTableKeys] = useState([])
  const [filteredTableKeys, setFilteredTableKeys] = useState([])
  const [groupBy, setGroupBy] = useState({
    col1: '',
    func: '',
    col2: '',
  })
  const [where, setWhere] = useState({
    col: '',
    func: '',
    val: '',
  })
  const [sort, setSort] = useState({
    col: '',
    direction: '',
  })
  const [filter, setFilter] = useState({})
  const [calculate, setCalculate] = useState({})
  const downloadLink = useRef()
  const [uniqueEvents, setUniqueEvents] = useState([])
  const [selectedEvents, setSelectedEvents] = useState([])

  const clearFilters = () => {
    setGroupBy({ col1: '', func: '', col2: '' })
    setFilter({ col: '', func: '', val: '' })
    setSort({ col: '', direction: '' })
    setFilter({})
  }

  useEffect(() => {
    clearFilters()
    getHackerInfo(setUnfilteredData, id, currTable)
  }, [currTable, id])

  useEffect(() => {
    if (unfilteredData.length > 0) {
      setUnfilteredTableKeys(Object.keys(unfilteredData[0]))
      setFilteredTableKeys(Object.keys(unfilteredData[0]))
      setFilteredData(unfilteredData)
    }
  }, [unfilteredData])

  useEffect(() => {
    const query = createQuery(filter)
    const res = executeQuery(query, unfilteredData)
    if (res.length > 0) {
      setFilteredTableKeys(Object.keys(res[0]))
    }
    setFilteredData(res)
  }, [filter])

  useEffect(() => {
    if (unfilteredData.length > 0 && currTable === 'Applicants') {
      const events = new Set()
      unfilteredData.forEach(hacker => {
        if (hacker.attendedEvents) {
          const hackerEvents = hacker.attendedEvents.split(',').map(e => e.trim())
          hackerEvents.forEach(event => {
            if (event) events.add(event)
          })
        }
      })
      setUniqueEvents(Array.from(events))
    }
  }, [unfilteredData, currTable])

  const applyEventFilter = () => {
    if (selectedEvents.length === 0) {
      setFilteredData(unfilteredData)
      return
    }

    const filtered = unfilteredData.filter(hacker => {
      if (!hacker.attendedEvents) return false
      const hackerEvents = hacker.attendedEvents.split(',').map(e => e.trim())
      return selectedEvents.every(event => hackerEvents.includes(event))
    })
    setFilteredData(filtered)
  }

  const saveGroupBy = () => {
    setFilter({
      ...filter,
      GROUPBY: {
        COLUMN: groupBy.col1,
        APPLY: [
          {
            [`${groupBy.func} ${groupBy.col2}`]: {
              [`${groupBy.func}`]: groupBy.col2,
            },
          },
        ],
      },
    })
  }

  const saveWhere = () => {
    const condition = {}
    if (['NIS', 'NEQ'].includes(where.func)) {
      // negation condition
      condition.NOT = {
        [where.func.substring(1)]: {
          [where.col]: where.func === 'NEQ' ? Number(where.val) : where.val,
        },
      }
    } else {
      condition[where.func] = {
        [where.col]: where.func !== 'IS' ? Number(where.val) : where.val,
      }
    }
    setFilter({
      ...filter,
      WHERE: condition,
    })
  }

  const saveSort = () => {
    setFilter({
      ...filter,
      ORDER: {
        keys: [sort.col],
        dir: sort.direction,
      },
    })
  }

  const HackerInfoRow = ({ data }) => {
    return (
      <TableRow>
        {filteredTableKeys.map(key => (
          <TableData key={`${data}-${key}`}>{data[key]}</TableData>
        ))}
      </TableRow>
    )
  }

  const renderTable = useMemo(
    () => (
      <TableWrapper maxWidth="calc(100vw - 400px)">
        <TableContent layout="auto">
          {filteredData.length > 0 && (
            <>
              <thead>
                <TableRow>
                  {filteredTableKeys.map(key => (
                    <TableHeader key={key}>
                      {calculate[key] ? (
                        <CalculateResult>
                          {`${calculate[key]}: ${calculateColumn(key, calculate[key], filteredData)}`}
                          <Button
                            type={CLOSE}
                            onClick={() => {
                              const newCalculate = { ...calculate }
                              delete newCalculate[key]
                              setCalculate(newCalculate)
                            }}
                            color={COLOR.TRANSPARENT}
                            contentColor={COLOR.DARK_GRAY}
                          />
                        </CalculateResult>
                      ) : (
                        <Calculate
                          value={calculate[key]}
                          onChange={e => {
                            const newCalculate = { ...calculate }
                            newCalculate[key] = e.target.value
                            setCalculate(newCalculate)
                          }}
                        >
                          <option value="" disabled selected hidden>
                            Calculate
                          </option>
                          {calculateFunctions.map(func => (
                            <option value={func} key={`calc-${key}-${func}`}>
                              {func}
                            </option>
                          ))}
                        </Calculate>
                      )}
                    </TableHeader>
                  ))}
                </TableRow>
                <TableRow>
                  {filteredTableKeys.map(key => (
                    <TableHeader key={key}>{key}</TableHeader>
                  ))}
                </TableRow>
              </thead>
              <tbody>
                {filteredData.map(entry => (
                  <HackerInfoRow key={entry} data={entry} />
                ))}
              </tbody>
            </>
          )}
        </TableContent>
      </TableWrapper>
    ),
    [filteredTableKeys, filteredData, calculate]
  )

  return (
    <Page currentPath={id} hackathons={hackathons} navbarItems={HACKATHON_NAVBAR}>
      <Buttons>
        <TableOptionsButtons>
          {tableOptions.map(option => (
            <Button
              color="transparent"
              onClick={() => setCurrTable(option)}
              disabled={currTable === option}
              key={option}
            >
              {option === 'DayOf' ? 'Schedule' : option}
            </Button>
          ))}
        </TableOptionsButtons>
        <ExportButton>
          <Button
            onClick={() => {
              downloadLink.current.link.click()
            }}
          >
            Export
          </Button>
          <CSVLink style={{ visibility: 'hidden' }} ref={downloadLink} filename="hackerinfo.csv" data={filteredData} />
        </ExportButton>
      </Buttons>
      <Filters>
        <FilterPills>
          {filter.GROUPBY && (
            <Pill>
              <Button
                type={CLOSE}
                color={COLOR.TRANSPARENT}
                contentColor={COLOR.DARK_GRAY}
                onClick={() => {
                  const newFilter = { ...filter }
                  delete newFilter.GROUPBY
                  setGroupBy({ col1: '', func: '', col2: '' })
                  setFilter(newFilter)
                }}
              />
              Group by: {filter.GROUPBY.COLUMN}
            </Pill>
          )}
          {filter.WHERE && (
            <Pill>
              <Button
                type={CLOSE}
                color={COLOR.TRANSPARENT}
                contentColor={COLOR.DARK_GRAY}
                onClick={() => {
                  const newFilter = { ...filter }
                  delete newFilter.WHERE
                  setWhere({ col: '', func: '', val: '' })
                  setFilter(newFilter)
                }}
              />
              Filter:{' '}
              {filter.WHERE.NOT
                ? Object.keys(filter.WHERE.NOT[Object.keys(filter.WHERE.NOT)[0]])[0]
                : Object.keys(filter.WHERE[Object.keys(filter.WHERE)[0]])[0]}
            </Pill>
          )}
          {filter.ORDER && (
            <Pill>
              <Button
                type={CLOSE}
                color={COLOR.TRANSPARENT}
                contentColor={COLOR.DARK_GRAY}
                onClick={() => {
                  const newFilter = { ...filter }
                  delete newFilter.ORDER
                  setSort({ col: '', direction: '' })
                  setFilter(newFilter)
                }}
              />
              Sort: {filter.ORDER.keys[0]}
            </Pill>
          )}
        </FilterPills>
        <FilterOptions>
          <Menu label="Group By">
            <Selection>
              <select value={groupBy.col1} onChange={e => setGroupBy({ ...groupBy, col1: e.target.value })}>
                <option value="" disabled selected hidden>
                  Column 1
                </option>
                {unfilteredTableKeys.map(key => (
                  <option value={key} key={`group-col1-${key}`}>
                    {key}
                  </option>
                ))}
              </select>
              <select value={groupBy.func} onChange={e => setGroupBy({ ...groupBy, func: e.target.value })}>
                <option value="" disabled selected hidden>
                  Function
                </option>
                {groupByFunctions.map(func => (
                  <option value={func.value} key={`group-func-${func.label}`}>
                    {func.label}
                  </option>
                ))}
              </select>
              <select value={groupBy.col2} onChange={e => setGroupBy({ ...groupBy, col2: e.target.value })}>
                <option value="" disabled selected hidden>
                  Column 2
                </option>
                {unfilteredTableKeys.map(key => (
                  <option value={key} key={`group-col2-${key}`}>
                    {key}
                  </option>
                ))}
              </select>
              {groupBy.col1 && groupBy.func && groupBy.col2 && (
                <Button
                  type={CHECK}
                  onClick={() => saveGroupBy()}
                  color={COLOR.TRANSPARENT}
                  contentColor={COLOR.DARK_GRAY}
                />
              )}
            </Selection>
          </Menu>
          <Menu label="Filter">
            <Selection>
              Where
              <select value={where.col} onChange={e => setWhere({ ...where, col: e.target.value })}>
                <option value="" disabled selected hidden>
                  Select Column
                </option>
                {unfilteredTableKeys.map(key => (
                  <option value={key} key={`filter-col-${key}`}>
                    {key}
                  </option>
                ))}
              </select>
              <select value={where.func} onChange={e => setWhere({ ...where, func: e.target.value })}>
                <option value="" disabled selected hidden>
                  Condition
                </option>
                {filterFunctions.map(func => (
                  <option value={func.value} key={`filter-${func.label}`}>
                    {func.label}
                  </option>
                ))}
              </select>
              <input
                value={where.val}
                type={['IS', 'NIS'].includes(where.func) ? 'text' : 'number'}
                onChange={e => setWhere({ ...where, val: e.target.value })}
                placeholder="Value"
              />
              {where.col && where.func && where.val && (
                <Button
                  type={CHECK}
                  onClick={() => saveWhere()}
                  color={COLOR.TRANSPARENT}
                  contentColor={COLOR.DARK_GRAY}
                />
              )}
            </Selection>
          </Menu>
          <Menu label="Sort">
            <Selection>
              <select value={sort.col} onChange={e => setSort({ ...sort, col: e.target.value })}>
                <option value="" disabled selected hidden>
                  Select Option
                </option>
                {filteredTableKeys.map(key => (
                  <option value={key} key={`sort-${key}`}>
                    {key}
                  </option>
                ))}
              </select>
              <select value={sort.direction} onChange={e => setSort({ ...sort, direction: e.target.value })}>
                <option value="" disabled selected hidden>
                  Order
                </option>
                <option value="UP">Ascending</option>
                <option value="DOWN">Descending</option>
              </select>
              {sort.col && sort.direction && (
                <Button
                  type={CHECK}
                  onClick={() => saveSort()}
                  color={COLOR.TRANSPARENT}
                  contentColor={COLOR.DARK_GRAY}
                />
              )}
            </Selection>
          </Menu>
          <Menu label="Events">
            <Selection>
              {uniqueEvents.map(event => (
                <label key={event} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(event)}
                    onChange={e => {
                      if (e.target.checked) {
                        setSelectedEvents([...selectedEvents, event])
                      } else {
                        setSelectedEvents(selectedEvents.filter(ev => ev !== event))
                      }
                    }}
                  />
                  {event}
                </label>
              ))}
              {uniqueEvents.length > 0 && (
                <Button
                  type={CHECK}
                  onClick={applyEventFilter}
                  color={COLOR.TRANSPARENT}
                  contentColor={COLOR.DARK_GRAY}
                />
              )}
            </Selection>
          </Menu>
        </FilterOptions>
      </Filters>
      {renderTable}
    </Page>
  )
}

export const getStaticPaths = async () => {
  return getHackathonPaths()
}

export const getStaticProps = async ({ params }) => {
  const hackathons = await getHackathons()
  return {
    props: {
      hackathons,
      id: params.id,
    },
  }
}
