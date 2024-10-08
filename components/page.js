import { useEffect, useState } from 'react'
import styled from 'styled-components'
import LoadingGif from '../assets/nwplus.gif'
import { COLOR } from '../constants'
import Navbar from './navbar'
import Sidebar from './sidebar'
import HackerAppNavbar from './hackerAppNavbar'

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
  ${p => !p.isFullscreen && !p.hackerAppHeader && 'padding: 40px 0;'}
`

const StyledHackerAppSection = styled.div`
  display: flex;
  margin-top: 60px;
  gap: 75px;
`

const StyledHackerAppNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default ({
  hackathons,
  currentPath,
  children,
  navbarItems,
  isFullscreen,
  hackerAppHeader,
  hackerAppNavbarItems,
}) => {
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
          {hackerAppHeader && (
            <>
              <StyledHackerAppNav>
                <HeaderContainer>
                  <Header>Hacker Application / {hackerAppHeader}</Header>
                  {loading && <LoadingImage src={LoadingGif} />}
                </HeaderContainer>
              </StyledHackerAppNav>
              <StyledHackerAppSection>
                <HackerAppNavbar
                  items={hackerAppNavbarItems}
                  setLoading={setLoading}
                  currentPath={currentPath}
                  setTimeOut={setTimeOut}
                />
                <Children isFullscreen={isFullscreen} hackerAppHeader={hackerAppHeader}>
                  {children}
                </Children>
              </StyledHackerAppSection>
            </>
          )}
          {navbarItems && (
            <>
              <HeaderContainer>
                <Header>{currentPath}</Header>
                {loading && <LoadingImage src={LoadingGif} />}
              </HeaderContainer>
              <Navbar items={navbarItems} setLoading={setLoading} currentPath={currentPath} setTimeOut={setTimeOut} />
            </>
          )}
          {!hackerAppHeader && (
            <Children isFullscreen={isFullscreen} hackerAppHeader={hackerAppHeader}>
              {children}
            </Children>
          )}
        </Content>
      </div>
    </Container>
  )
}
