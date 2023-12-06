import styled from 'styled-components'
import nwplusLogo from '../assets/nwplus.svg'
import { formatDate } from '../utility/firebase'

const NwplusImage = styled.img`
  width: 150px;
  height: 150px;
`

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

const MainContent = styled.div`
  width: 400px;
  height: 400px;
  font-family: 'HK Grotesk';
  font-size: 24px;
  text-align: center;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
`

const TextLine = styled.p`
  margin: 5% 0;
`

const BoldedTextLine = styled.p`
  margin: 5% 0;
  font-size: 24;
  font-weight: bold;
`

export default function CMSUnderConstructionPage({ date }) {
  return (
    <Container>
      <MainContent>
        <NwplusImage src={nwplusLogo} />
        <BoldedTextLine>nwPlus CMS</BoldedTextLine>
        <TextLine> The CMS is under maintenance. </TextLine>
        <TextLine>
          {typeof date !== 'boolean' ? `It will be back up at ${formatDate(date.seconds)}` : 'It will be back up soon!'}
        </TextLine>
        <TextLine>Please come back later.</TextLine>
      </MainContent>
    </Container>
  )
}
