import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import { COLOR } from '../constants';
import Website from './icons/website';
import Power from './icons/power';
import { logout } from '../utility/firebase';
import LoadingGif from '../assets/nwplus.gif';

const SidebarContainer = styled.div`
  background-color: ${COLOR.PRIMARY};
  color: ${COLOR.WHITE};
  box-sizing: border-box;
  width: 300px;
  padding: 30px;
`;

const HeaderContainer = styled.div`
  display: flex;
`;

const Header = styled.h1`
  font-weight: bold;
  font-size: 32px;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Item = styled.p`
  padding-left: 10px;
  display: inline-block;
  color: ${COLOR.DARK_COPY};
`;

const Link = styled.a`
  display: block;
  color: ${(p) => (p.selected ? COLOR.WHITE : COLOR.DARK_COPY)};
  text-decoration: none;
  padding: 10px 0 10px 75px;
  margin: 0 -30px;
  &:hover {
    color: ${COLOR.WHITE};
  }
  &:focus {
    color: ${COLOR.WHITE};
  }
  ${(p) => p.selected && 'background-color: #1b1821'}
`;

const Logout = styled.button`
  padding: 0;
  margin-top: 30px;
  display: block;
  background: none;
  border: none;
  text-decoration: none;
  width: 100%;
  cursor: pointer;
  color: ${COLOR.DARK_COPY};
  &:hover {
    p {
      color: ${COLOR.WHITE};
    }
    svg {
      fill: ${COLOR.WHITE};
    }
  }
  &:focus {
    p {
      color: ${COLOR.WHITE};
    }
    svg {
      fill: ${COLOR.WHITE};
    }
  }
`;

const LoadingImage = styled.img`
  height: 50px;
  width: 50px;
  padding-left: 10px;
`;

export default ({ hackathons, currentPath }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [window.location.pathname]);
  return (
    <SidebarContainer>
      <HeaderContainer>
        <Header>nwPlus CMS</Header>
        {loading && <LoadingImage src={LoadingGif} />}
      </HeaderContainer>
      <ItemContainer>
        <Website />
        <Item>Websites</Item>
      </ItemContainer>
      {hackathons.map((id) => {
        return (
          <NextLink key={id} href="/[id]/intro" as={`/${id}/intro`}>
            <Link
              onClick={() => setLoading(true)}
              selected={currentPath === id}
            >
              {id}
            </Link>
          </NextLink>
        );
      })}
      <Logout
        // TODO: logout
        onClick={() => {
          setLoading(true);
          logout();
        }}
      >
        <ItemContainer>
          <Power />
          <Item>Logout</Item>
        </ItemContainer>
      </Logout>
    </SidebarContainer>
  );
};
