import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.LIGHT_GRAY};
  border-radius: 8px;
  padding: 12px;
  gap: 20px;
  width: 100px;
  height: 110px;
  justify-content: center;
`

const NavLink = styled.a`
  padding: 0px 4px 0px 4px;
  font-size: 14px;
  font-weight: ${p => (p.selected ? 800 : 500)};
  text-decoration: none;
  color: ${COLOR.MIDNIGHT_PURPLE_DEEP};
  transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    color: ${COLOR.MIDNIGHT_PURPLE_LIGHT};
  }
`

const getHref = (currentPath, key) => {
  return currentPath.includes('Livesite') ? `/Livesite/${key}` : `/hackerapps/[id]/${key}`
}

export default ({ items, setTimeOut, setLoading, currentPath }) => {
  const currentPage = window.location.pathname.split('/')[3]
  const onClick = ({ path }) => {
    if (!window.location.href.includes(path)) {
      setTimeOut(
        setTimeout(() => {
          setLoading(true)
        }, 750)
      )
    }
  }

  return (
    <Container>
      {Object.entries(items).map(([key, value]) => {
        return (
        <Link key={key} href={getHref(currentPath, key)} as={`${key}`} passHref>
          <NavLink onClick={() => onClick(key)} selected={currentPage === key}>
            {value}
          </NavLink>
        </Link>
        )
        })}
    </Container>
  )
}
