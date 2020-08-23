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
            if (user) {
                console.log(user)
                if (router.pathname=='/') router.push('/landing')
                setUser(user)
            } else {
                console.log("pushing...")
                router.push('/')
                console.log("pushed")
            }
        })

        return () => unsubscribe()
    }, [])

    // if (user==null && router.pathname!="/") {
    //     return <div>Loading...</div>
    // } else {
        return (

            <AuthContext.Provider value={{ isAuthenticated: !!user, user }}>
                {(user==null&&router.pathname!='/') ? <div>Loading...</div> : children}
            </AuthContext.Provider>
        )
    
    
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default Auth