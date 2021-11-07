import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import { COLOR } from '../constants';
import Website from './icons/website';
import Icon from './Icon';
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
  color: ${COLOR.DARK_COPY};
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
  i {
    transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  &:hover {
    p {
      color: ${COLOR.WHITE};
    }
    svg {
      fill: ${COLOR.WHITE};
    }
    i {
      color: ${COLOR.WHITE};
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

const getTrailingPath = (currentPath) => {
  const paths = window.location.href.split('/');
  const pathIndex = paths.findIndex((val) => val === currentPath);
  const trailingPathArray = paths.slice(pathIndex + 1);
  if (
    pathIndex === -1 ||
    trailingPathArray.length === 0 ||
    paths.includes('Livesite')
  ) {
    return 'intro';
  }
  return trailingPathArray.join('/');
};

export default ({ hackathons, currentPath }) => {
  const [loading, setLoading] = useState(false);
  const [ifTimeOut, setIfTimeOut] = useState();

  useEffect(() => {
    setLoading(false);
    clearTimeout(ifTimeOut);
  }, [window.location.pathname]);

  const generateLinkTemplate = () => {
    return `/[id]/${getTrailingPath(currentPath)}`;
  };

  const generateLink = (id) => {
    return `/${id}/${getTrailingPath(currentPath)}`;
  };

  return (
    <SidebarContainer>
      <HeaderContainer>
        <Header>nwPlus CMS</Header>
        {loading && <LoadingImage src={LoadingGif} />}
      </HeaderContainer>
      <NextLink
        href="/Livesite/announcements"
        as="/Livesite/announcements"
        passHref
      >
        <Link>
          <ItemContainer>
            <Icon color={currentPath === 'Livesite' && COLOR.WHITE}  icon='circle' />
            <Label selected={currentPath === 'Livesite'}>Livesite</Label>
          </ItemContainer>
        </Link>
      </NextLink>
      <NextLink href="/faq" as="/faq" passHref>
        <Link
          onClick={() => {
            if (currentPath !== 'faq') {
              setIfTimeOut(
                setTimeout(() => {
                  setLoading(true);
                }, 750)
              );
            }
          }}
        >
          <ItemContainer>
            <Icon color={currentPath === 'faq' && COLOR.WHITE} icon='question-circle' />
            <Label selected={currentPath === 'faq'}>FAQs</Label>
          </ItemContainer>
        </Link>
      </NextLink>
      <ItemContainer>
        <Icon color={hackathons.includes(currentPath) && COLOR.WHITE} icon='th-list' />
        <Label selected={hackathons.includes(currentPath)}>Websites</Label>
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

      <NextLink href="/assessment" as="/assessment" passHref>
        <Link>
          <ItemContainer>
            <Icon color={currentPath === 'assessment' && COLOR.WHITE} icon='user-check' />
            <Label selected={currentPath === 'assessment'}>Assessment</Label>
          </ItemContainer>
        </Link>
      </NextLink>

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
          <Icon icon='sign-out-alt' />
          <Label>Logout</Label>
        </ItemContainer>
      </Link>
    </SidebarContainer>
  );
};
