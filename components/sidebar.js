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

const SelectedItem = styled.p`
  padding-left: 10px;
  display: inline-block;
  font-weight: 700;
  color: ${COLOR.WHITE};
`;

const Item = styled.p`
  padding-left: 10px;
  display: inline-block;
  color: ${COLOR.DARK_COPY};
`;

const Link = styled.a`
  transition: color 0.4s cubic-bezier(.25,.8,.25,1);
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
    transition: color 0.4s cubic-bezier(.25,.8,.25,1);
  };
  svg {
    transition: fill 0.4s cubic-bezier(.25,.8,.25,1);
  };
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
  const [trailingPath, setTrailingPath] = useState();

  const getTrailingPath = () => {
    const paths = window.location.href.split('/');
    const pathIndex = paths.findIndex((val) => val === currentPath);
    const trailingPathArray = paths.slice(pathIndex + 1);
    if (pathIndex === -1 || trailingPathArray.length === 0) {
      return 'intro';
    }
    return trailingPathArray.join('/');
  };

  useEffect(() => {
    setLoading(false);
    clearTimeout(ifTimeOut);
    setTrailingPath(getTrailingPath);
  }, [window.location.pathname]);

  const generateLinkTemplate = () => {
    return `/[id]/${trailingPath}`;
  };

  const generateLink = (id) => {
    return `/${id}/${trailingPath}`;
  };

  return (
    <SidebarContainer>
      <HeaderContainer>
        <Header>nwPlus CMS</Header>
        {loading && <LoadingImage src={LoadingGif} />}
      </HeaderContainer>
      <ItemContainer>
        <Website />
        <SelectedItem>Websites</SelectedItem>
      </ItemContainer>
      {hackathons.map((id) => {
        const href = generateLinkTemplate(id);
        const link = generateLink(id);
        return (
          <NextLink key={id} href={href} as={link}>
            <Link
              href='#!'
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
            </Link>
          </NextLink>
        );
      })}
      <Logout
        // TODO: logout
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
          <Item>Logout</Item>
        </ItemContainer>
      </Logout>
    </SidebarContainer>
  );
};
