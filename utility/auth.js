import firebase from 'firebase/app'
import 'firebase/auth'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'
import LoadingPage from '../components/LoadingPage'

export const checkAdminClaim = async user => {
  const token = await user.getIdTokenResult()
  return Object.prototype.hasOwnProperty.call(token.claims, 'admin')
}

export const AuthContext = createContext()

const Auth = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async currUser => {
      if (currUser === null) {
        await router.replace('/')
      } else {
        const isAdmin = await checkAdminClaim(currUser)
        if (!isAdmin) {
          await router.replace('/')
        } else {
          setUser(currUser)
          if (router.pathname === '/') await router.push('/landing')
        }
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // useEffect(() => {
  //   return firebase.auth().onAuthStateChanged(() => {
  //     setUser(user);
  //     console.log(router.pathname);
  //     router.push(router.pathname);
  //   });
  // }, [router.pathname]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, setUser }}>
      {isLoading ? <LoadingPage /> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default Auth
