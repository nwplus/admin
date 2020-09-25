import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from './sidebar';
import Navbar from './navbar';
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

export default ({ hackathons, currentPath, children, includeNavbar }) => {
  const [loading, setLoading] = useState(false);
  const [timeOut, setTimeOut] = useState();

  useEffect(() => {
    setLoading(false);
    clearTimeout(timeOut);
  }, [currentPath]);

  return (
    <Container>
      <Sidebar currentPath={currentPath} hackathons={hackathons} />
      <div style={{ width: '80vw' }}>
        {includeNavbar && (
          <>
            <HeaderContainer>
              <Header>{currentPath}</Header>
              {loading && <LoadingImage src={LoadingGif} />}
            </HeaderContainer>
            <Navbar
              setLoading={setLoading}
              currentPath={currentPath}
              setTimeOut={setTimeOut}
            />
          </>
        )}
        <Content>{children}</Content>
      </div>
    </Container>
  );
};
