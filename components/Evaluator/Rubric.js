import { useState } from 'react'
import styled from 'styled-components'
import Teapots from '../../assets/teapots.svg'
import { ASSESSMENT_COLOR, COLOR, RUBRIC } from '../../constants'
import { Title5 } from '../Typography'
import RubricDropdown from './RubricDropdown'
import RubricEntry from './RubricEntry'

const Container = styled.div`
  height: 40%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
`

const HeadContainer = styled.div`
  padding: 0 1rem;
`

const ContentContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`

const StyledTable = styled.table`
  overflow-y: auto;
  height: 100%;
  display: block;
  padding-left: 1rem;

  ::-webkit-scrollbar {
    width: 10px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-style: solid;
    border-color: transparent;
    background-clip: padding-box;
    border-radius: 10px;
    box-shadow: inset 0 0 6px 6px ${ASSESSMENT_COLOR.UNSCORED_GRAY};
  }
`

const EmptyValueContentContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledImg = styled.img`
  width: 100%;
  height: 60%;
`

const StyledText = styled.div`
  color: ${COLOR.INACTIVE_DARK_GRAY};
  text-align: center;
  font-size: 0.8em;
  margin-top: 10px;
`

const Rubric = () => {
  const [selected, setSelected] = useState(null)
  return (
    <Container>
      <HeadContainer>
        <Title5 color={COLOR.MIDNIGHT_PURPLE}>Rubric</Title5>
        <RubricDropdown onSelect={val => setSelected(val)} />
      </HeadContainer>
      <ContentContainer>
        {selected !== null ? (
          <StyledTable>
            <tbody>
              {RUBRIC[selected].map(rubricEntry => (
                <RubricEntry score={rubricEntry.score} label={rubricEntry.label} />
              ))}
            </tbody>
          </StyledTable>
        ) : (
          <EmptyValueContentContainer>
            <StyledImg src={Teapots} />
            <StyledText>
              Select a rubric from the <br /> dropdown above.
            </StyledText>
          </EmptyValueContentContainer>
        )}
      </ContentContainer>
    </Container>
  )
}

export default Rubric
