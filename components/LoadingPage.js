import styled from 'styled-components'
import nwPlusReversed from '../assets/nwplus-reversed.gif'

const LoadingScreenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`

const LoadingImage = styled.img`
  height: 100px;
  width: 100px;
  margin: auto;
`

const LoadingDiv = styled.div`
  font-size: 40px;
`
export default function LoadingPage() {
  return (
    <LoadingScreenContainer>
      <div>
        <LoadingImage src={nwPlusReversed} />
        <LoadingDiv>Authenticating...</LoadingDiv>
      </div>
    </LoadingScreenContainer>
  )
}
