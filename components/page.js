import { useEffect, useState } from 'react'
import styled from 'styled-components'
import LoadingGif from '../assets/nwplus.gif'
import { COLOR } from '../constants'
import Navbar from './navbar'
import Sidebar from './sidebar'

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`

const LoadingImage = styled.img`
  height: 50px;
  width: 50px;
  padding-left: 20px;
`

const Header = styled.h1`
  color: ${COLOR.BLACK};
`

const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
`

const Content = styled.div`
  ${p => (p.isFullscreen ? 'padding: 0;' : 'padding: 40px;')}
`

const Children = styled.div`
  ${p => !p.isFullscreen && 'padding: 40px 0;'}
`

export default ({ hackathons, currentPath, children, navbarItems, isFullscreen }) => {
  const [loading, setLoading] = useState(false)
  const [timeOut, setTimeOut] = useState()

  useEffect(() => {
    setLoading(false)
    clearTimeout(timeOut)
  }, [currentPath])

  return (
    <Container>
      <Sidebar currentPath={currentPath} hackathons={hackathons} />
      <div style={{ flexGrow: '1' }}>
        <Content isFullscreen={isFullscreen}>
          {navbarItems && (
            <>
              <HeaderContainer>
                <Header>{currentPath}</Header>
                {loading && <LoadingImage src={LoadingGif} />}
              </HeaderContainer>
              <Navbar items={navbarItems} setLoading={setLoading} currentPath={currentPath} setTimeOut={setTimeOut} />
            </>
          )}
          <Children isFullscreen={isFullscreen}>{children}</Children>
        </Content>
      </div>
    </Container>
  )
}
