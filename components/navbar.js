import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { COLOR } from '../constants';

const HackathonNavBar = styled.div`
  display: flex;
  padding-left: 60px;
`;

const NavItem = styled.a`
  display: block;
  font-size: 24px;
  font-weight: 600;
  margin-right: 40px;
  text-decoration: none;
  color: ${(p) => (p.selected ? COLOR.BLACK : COLOR.DARK_COPY)};
  border-bottom: ${(p) => (p.selected ? `3px solid ${COLOR.BLACK}` : 'none')};
  transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    color: ${COLOR.BLACK};
  }
  &:focus {
    color: ${COLOR.BLACK};
  }
`;

export default ({ setTimeOut, setLoading, currentPath }) => {
  const currentPage = window.location.pathname.split('/')[2];
  const onClick = ({ path }) => {
    if (!window.location.href.includes(path)) {
      setTimeOut(
        setTimeout(() => {
          setLoading(true);
        }, 750)
      );
    }
  };

  return (
    <HackathonNavBar>
      <Link href="/[id]/intro" as={`/${currentPath}/intro`} passHref>
        <NavItem
          onClick={() => onClick('intro')}
          selected={currentPage === 'intro'}
        >
          Intro
        </NavItem>
      </Link>
      <Link href="/[id]/faq" as={`/${currentPath}/faq`} passHref>
        <NavItem
          onClick={() => onClick('faq')}
          selected={currentPage === 'faq'}
        >
          FAQ
        </NavItem>
      </Link>
      <Link href="/[id]/spocos" as={`/${currentPath}/spocos`} passHref>
        <NavItem
          onClick={() => onClick('spocos')}
          selected={currentPage === 'spocos'}
        >
          Sponsors
        </NavItem>
      </Link>
      <Link
        href="/[id]/FeatureFlags"
        as={`/${currentPath}/FeatureFlags`}
        passHref
      >
        <NavItem
          onClick={() => onClick('FeatureFlags')}
          selected={currentPage === 'FeatureFlags'}
        >
          FeatureFlags
        </NavItem>
      </Link>
    </HackathonNavBar>
  );
};
