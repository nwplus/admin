import React, { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase'

const AuthContext = createContext({});

const Auth = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    console.log(router.pathname)
    console.log(`${isLoading} outside`)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
            console.log(router.pathname+" curr path")
            if (user && /.+@nwplus\.io$/.test(user.email)) {
                if (router.pathname=='/') await router.push('/landing')
                console.log(user)
                
                setUser(user)
            } else {
                console.log("pushing...")
                if (router.pathname!='/') await router.push('/')
                console.log("pushed")
                
            }
            if (isLoading) {
                console.log("changing loading state...")
                setIsLoading(false)
                console.log("changed state")
            }
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user }}>
            {isLoading ? <h1>Loading....</h1> : children}
        </AuthContext.Provider>
    )
    
    
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default Auth