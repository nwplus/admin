import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../constants'

const Container = styled.div`
  display: flex;
`

const NavLink = styled.a`
  display: block;
  font-size: 24px;
  font-weight: 600;
  margin-right: 40px;
  text-decoration: none;
  color: ${p => (p.selected ? COLOR.BLACK : COLOR.DARK_COPY)};
  border-bottom: ${p => (p.selected ? `3px solid ${COLOR.BLACK}` : 'none')};
  transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    color: ${COLOR.BLACK};
  }
  &:focus {
    color: ${COLOR.BLACK};
  }
`

const getHref = (currentPath, key) => {
  return currentPath.includes('portal') ? `/portal/[id]/${key}` : `/[id]/${key}`
}

export default ({ items, setTimeOut, setLoading, currentPath }) => {
  const router = useRouter()
  const { id } = router.query

  const currentPage = currentPath.includes('portal') ? router.pathname.split('/')[3] : router.pathname.split('/')[2]

  const onClick = path => {
    if (!router.pathname.includes(path)) {
      setTimeOut(
        setTimeout(() => {
          setLoading(true)
        }, 750)
      )
    }
  }

  return (
    <Container>
      {Object.entries(items).map(([key, value]) => (
        <Link
          key={key}
          href={getHref(currentPath, key)}
          as={currentPath.includes('portal') ? `/portal/${id}/${key}` : `/${id}/${key}`}
          passHref
        >
          <NavLink onClick={() => onClick(key)} selected={currentPage === key}>
            {value}
          </NavLink>
        </Link>
      ))}
    </Container>
  )
}
