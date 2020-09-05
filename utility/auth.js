import React, { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase'

export const checkAdminClaim = async user => {
    const token = await user.getIdTokenResult()
    return token.claims.hasOwnProperty('admin')
}

const AuthContext = createContext({});

const Auth = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    // const checkAdminClaim = async user => {
    //     const token = await user.getIdTokenResult()
    //     return token.claims.hasOwnProperty('admin')
    // }

    useEffect(() => {
        const setPersistence = async () => {
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        }
        setPersistence()
    },[])
    
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
            if (user === null) {
                await router.push('/')
            } else {
                const isAdmin = await checkAdminClaim(user)
                if (!isAdmin) {
                    await router.push('/')
                } else {
                    setUser(user)
                }
            }
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, checkAdminClaim }}>
            {isLoading ? <h1>Authenticating...</h1> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default Auth