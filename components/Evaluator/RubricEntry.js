import styled from 'styled-components';
import { COLOR } from '../../constants';

const Container = styled.tr`
    display: flex;
    border-bottom: 0.5px solid ${COLOR.GREY_500};
    padding: 20px 0px;
`

const StyledScore = styled.td`
    border-radius: 5px;
    background-color: ${COLOR.GREY_200};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    height: 30px;
    color: ${COLOR.MIDNIGHT_PURPLE};
    border-style: solid;
    border-width: 1px;
    border-color: ${COLOR.EVAL_GREY};
    margin-right: 15px;
    font-weight: bold;
`

const StyledText = styled.td`
    color: ${COLOR.MIDNIGHT_PURPLE};
    width: 70%;
`

const RubricEntry = ({ score, label }) => {
    return (
        <Container>
            <StyledScore>{score}</StyledScore>
            <StyledText>{label}</StyledText>
        </Container>
    )
}

export default RubricEntry