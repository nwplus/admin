import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import { COLOR } from '../constants';
import Website from './icons/website';
import Power from './icons/power';
import Live from './icons/live';
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

const Label = styled.p`
  padding-left: 10px;
  display: inline-block;
  transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  ${(p) => p.selected && 'font-weight: 700;'}
  color: ${(p) => (p.selected ? COLOR.WHITE : COLOR.DARK_COPY)};
`;

const IndentedLink = styled.a`
  transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
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
  ${(p) => p.selected && `background-color: ${COLOR.PRIMARY_DARK}`}
`;

const Link = styled.a`
  font-family: 'HK Grotesk';
  font-size: 1em;
  padding: 0;
  margin-top: 30px;
  display: block;
  background: none;
  border: none;
  text-decoration: none;
  width: 100%;
  cursor: pointer;
  color: ${COLOR.DARK_COPY};
  p {
    transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  svg {
    transition: fill 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
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
  const [ifTimeOut, setIfTimeOut] = useState();

  useEffect(() => {
    setLoading(false);
    clearTimeout(ifTimeOut);
  }, [window.location.pathname]);

  const generateLinkTemplate = (id) => {
    return `/${id}/intro`;
  };

  const generateLink = (id) => {
    return `/${id}/intro`;
  };

  return (
    <SidebarContainer>
      <HeaderContainer>
        <Header>nwPlus CMS</Header>
        {loading && <LoadingImage src={LoadingGif} />}
      </HeaderContainer>
      <NextLink href="/livesite" as="/livesite" passHref>
        <Link>
          <ItemContainer>
            <Live color={currentPath === 'livesite' && COLOR.WHITE} />
            <Label selected={currentPath === 'livesite'}>Livesite</Label>
          </ItemContainer>
        </Link>
      </NextLink>
      <ItemContainer>
        <Website color={currentPath !== 'livesite' && COLOR.WHITE} />
        <Label selected={currentPath !== 'livesite'}>Websites</Label>
      </ItemContainer>
      {hackathons.map((id) => {
        const href = generateLinkTemplate(id);
        const link = generateLink(id);
        return (
          <NextLink key={id} href={href} as={link} passHref>
            <IndentedLink
              onClick={() => {
                if (currentPath !== id) {
                  setIfTimeOut(
                    setTimeout(() => {
                      setLoading(true);
                    }, 750)
                  );
                }
              }}
              selected={currentPath === id}
            >
              {id}
            </IndentedLink>
          </NextLink>
        );
      })}
      <Link
        href="#!"
        onClick={() => {
          setIfTimeOut(
            setTimeout(() => {
              setLoading(true);
            }, 750)
          );
          logout();
        }}
      >
        <ItemContainer>
          <Power />
          <Label>Logout</Label>
        </ItemContainer>
      </Link>
    </SidebarContainer>
  );
};
