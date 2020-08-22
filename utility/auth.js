import React, { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase'

const AuthContext = createContext({});

const Auth = ({ children }) => {
    const [user, setUser] = useState(null)
    const router = useRouter()
    console.log(router.pathname)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user && /.+@nwplus\.io$/.test(user.email)) {
                console.log(user)
                if (router.pathname=='/') {
                    router.push('/landing')
                } else {
                    setUser(user)
                }
            } else {
                console.log("pushing...")
                router.push('/')
                console.log("pushed")
            }
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default Auth