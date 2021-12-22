import { useState } from 'react';
import styled from 'styled-components';
import { ASSESSMENT_COLOR, COLOR, RUBRIC } from '../../constants';
import { Title4 } from '../Typography';
import Teapots from '../../assets/teapots.svg';
import RubricEntry from './RubricEntry';
import RubricDropdown from './RubricDropdown';

const Container = styled.div`
  padding: 0px 20px 30px;
  width: 15vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -20px;
  height: 80%;
  width: 100%;
  align-items: center;
  position: relative;
`;

const StyledTable = styled.table`
  overflow-y: scroll;
  height: 80%;
  display: block;
  margin-top: 20px;

  ::-webkit-scrollbar {
    width: 15px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-style: solid;
    border-color: transparent;
    border-left-width: 10px;
    background-clip: padding-box;
    border-radius: 10px;
    box-shadow: inset 0 0 6px 6px ${ASSESSMENT_COLOR.UNSCORED_GRAY};
  }
`;

const EmptyValueContentContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 60%;
`;

const StyledText = styled.div`
  color: ${COLOR.INACTIVE_DARK_GRAY};
  text-align: center;
  font-size: 0.8em;
  margin-top: 10px;
`;

const Rubric = () => {
  const [selected, setSelected] = useState(null);
  return (
    <Container>
      <Title4 color={COLOR.MIDNIGHT_PURPLE}>Rubric</Title4>
      <ContentContainer>
        <RubricDropdown onSelect={(val) => setSelected(val)} />
        {selected !== null ? (
          <StyledTable>
            <tbody>
              {RUBRIC[selected].map((rubricEntry) => (
                <RubricEntry
                  score={rubricEntry.score}
                  label={rubricEntry.label}
                />
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
  );
};

export default Rubric;
