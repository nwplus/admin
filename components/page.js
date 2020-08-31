import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './sidebar';
import { COLOR } from '../constants';

const HomeHeader = styled.h1`
  color: ${COLOR.BLACK};
  padding: 60px 0 0 60px;
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
  color: ${p => (p.selected ? COLOR.BLACK : COLOR.DARK_COPY)};
  border-bottom: ${p => (p.selected ? '3px solid black' : 'none')};
`;

export default ({ hackathons, currentPath, children }) => {
  const [currPath, setCurrPath] = useState('intro');
  useEffect(() => {
    setCurrPath(window.location.pathname.split('/')[2]);
  }, []);

  return (
    <Container>
      <Sidebar currentPath={currentPath} hackathons={hackathons} />
      <div>
        <HomeHeader>{currentPath} Home</HomeHeader>
        <HackathonNavBar>
          <NavItem
            key={`${currentPath}intro`}
            href={`/${currentPath}/intro`}
            selected={currPath === 'intro'}
          >
            Intro
          </NavItem>
          <NavItem 
            key={`${currentPath}faq`} 
            href={`/${currentPath}/faq`}
            selected={currPath === 'faq'}
          >
            FAQ
          </NavItem>
          <NavItem
            key={`${currentPath}sponsors`}
            href={`/${currentPath}/sponsors`}
            selected={currPath === 'sponsors'}
          >
            Sponsors
          </NavItem>
        </HackathonNavBar>
        <Content>{children}</Content>
      </div>
    </Container>
  );
};
