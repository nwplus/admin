import React, { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase'

const AuthContext = createContext({});

const Auth = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(async () => {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    },[])
    
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
            if (user && /.+@nwplus\.io$/.test(user.email)) {
                setUser(user)
                if (router.pathname=='/') await router.push('/landing')
            } else {
                await router.push('/')
            }
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user }}>
            {isLoading ? null : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default Auth