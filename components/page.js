import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Sidebar from './sidebar';
import { COLOR } from '../constants';
import LoadingGif from '../assets/nwplus.gif';

const HeaderContainer = styled.div`
  display: flex;
  padding: 60px 0 0 60px;
  align-items: center;
`;

const LoadingImage = styled.img`
  height: 50px;
  width: 50px;
  padding-left: 20px;
`;

const Header = styled.h1`
  color: ${COLOR.BLACK};
`;

const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 60px;
`;

const HackathonNavBar = styled.div`
  display: flex;
  padding-left: 60px;
`;

const NavItem = styled.a`
  display: block;
  cursor: pointer;
  font-size: 24px;
  margin-right: 40px;
  text-decoration: none;
  color: ${(p) => (p.selected ? COLOR.BLACK : COLOR.DARK_COPY)};
  border-bottom: ${(p) => (p.selected ? '3px solid black' : 'none')};
`;

export default ({ hackathons, currentPath, children }) => {
  const [currPath, setCurrPath] = useState('intro');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setCurrPath(window.location.pathname.split('/')[2]);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [currPath]);

  return (
    <Container>
      <Sidebar currentPath={currentPath} hackathons={hackathons} />
      <div style={{ 'max-width': '80vw' }}>
        <HeaderContainer>
          <Header>{currentPath}</Header>
          {loading && <LoadingImage src={LoadingGif} />}
        </HeaderContainer>
        <HackathonNavBar>
          <Link href="/[id]/intro" as={`/${currentPath}/intro`}>
            <NavItem
              onClick={() => setLoading(true)}
              selected={currPath === 'intro'}
            >
              Intro
            </NavItem>
          </Link>
          <Link href="/[id]/faq" as={`/${currentPath}/faq`}>
            <NavItem
              onClick={() => setLoading(true)}
              selected={currPath === 'faq'}
            >
              FAQ
            </NavItem>
          </Link>
          <Link href="/[id]/spocos" as={`/${currentPath}/spocos`}>
            <NavItem
              onClick={() => setLoading(true)}
              selected={currPath === 'spocos'}
            >
              Sponsors
            </NavItem>
          </Link>
        </HackathonNavBar>
        <Content>{children}</Content>
      </div>
    </Container>
  );
};
