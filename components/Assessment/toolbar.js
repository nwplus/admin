import React, { useState } from 'react'
import styled from 'styled-components'
import Arrow from '../../assets/arrow.svg'
import Filter from '../../assets/filter.svg'
import MagnifyingGlass from '../../assets/magnifyingGlass.svg'
import { ASSESSMENT_COLOR, SORT } from '../../constants'
import { logout } from '../../utility/firebase'
import { Button } from './Button'
import ExportModal from './ExportModal'
import AcceptingModal from './acceptingModal'

const ToolBarContainer = styled.div`
  width: 100%;
  background: ${ASSESSMENT_COLOR.TOOLBAR_GRAY};
  display: flex;
`

const Search = styled.input`
  width: 480px;
  height: 48px;
  margin: 8px 10px 8px 10px;
  padding: 0px 45px;
  font-size: 16px;
  display: inline-block;
  background-image: url(${MagnifyingGlass});
  background-position: 20px 15px;
  background-repeat: no-repeat;
  border: 1px solid ${ASSESSMENT_COLOR.UNSCORED_GRAY};
  border-radius: 4px;
  box-sizing: border-box;
  float: left;
  :focus {
    color: ${ASSESSMENT_COLOR.BLACK};
  }
`

const SortContainer = styled.div`
  display: flex;
`

const SortByText = styled.p`
  color: ${ASSESSMENT_COLOR.DARK_GRAY};
  font-size: 16px;
`

const SortSelect = styled.select`
  height: 48px;
  margin: 8px 60px 8px 20px;
  color: ${ASSESSMENT_COLOR.DARK_GRAY};
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid ${ASSESSMENT_COLOR.UNSCORED_GRAY};
  padding: 0px 12px;
`

const DownArrow = styled.img`
  cursor: pointer;
`

const UpArrow = styled.img`
  cursor: pointer;
  transform: scale(1, -1);
`

const FilterIcon = styled.img`
  cursor: pointer;
  margin-left: 30px;
`

export default function ToolBar({ search, sort, reverse, reversed }) {
  const [showExport, setShowExport] = useState(false)
  const [showAcceptance, setShowAcceptance] = useState(false)
  return (
    <ToolBarContainer>
      <Button bColor={ASSESSMENT_COLOR.RED} width="flex" onClick={() => logout()}>
        Logout
      </Button>
      <Search
        type="text"
        placeholder="Search"
        onChange={event => {
          search(event.target.value)
        }}
      />
      <SortContainer>
        <SortByText>Sort by: </SortByText>
        <SortSelect
          onChange={event => {
            sort(event.target.value)
          }}
        >
          <option value={SORT.TIMESTAMP}>{SORT.TIMESTAMP}</option>
          <option value={SORT.LAST_NAME}>{SORT.LAST_NAME}</option>
          <option value={SORT.FIRST_NAME}>{SORT.FIRST_NAME}</option>
          <option value={SORT.SCORE}>{SORT.SCORE}</option>
          <option value={SORT.STATUS}>{SORT.STATUS}</option>
        </SortSelect>
      </SortContainer>
      {reversed ? (
        <DownArrow src={Arrow} onClick={() => reverse(() => !reverse)} />
      ) : (
        <UpArrow src={Arrow} onClick={() => reverse(() => !reverse)} />
      )}
      <FilterIcon src={Filter} />
      <Button
        width="flex"
        bColor="black"
        onClick={async () => {
          setShowAcceptance(true)
        }}
      >
        Accept
      </Button>
      <Button
        width=" "
        bColor="black"
        onClick={async () => {
          setShowExport(true)
        }}
      >
        Export
      </Button>
      {showAcceptance && <AcceptingModal setShowing={setShowAcceptance} />}
      {showExport && <ExportModal setShowing={setShowExport} />}
    </ToolBarContainer>
  )
}
