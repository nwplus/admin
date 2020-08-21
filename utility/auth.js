import React, { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase'

const AuthContext = createContext({});

const Auth = ({ children }) => {
    const [user, setUser] = useState(null)
    // const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [pushToLanding, setPushToLanding] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user && /.+@nwplus\.io$/.test(user.email)) {
                setUser(user)
                setPushToLanding(true)
                // setIsAuthenticated(true)
                console.log(user)
            } else {
                console.log("pushing...")
                router.push('/')
                console.log("pushed")
            }
        })

        return () => unsubscribe()
    }, [])

    // useEffect(() => {
    //     const checkEmail = async () => {
    //         if (isAuthenticated) {
    //             console.log(/.+@nwplus\.io$/.test(user.email))
    //             if (/.+@nwplus\.io$/.test(user.email)) {
    //                 setPushToLanding(true)
    //                 setTimeout(async () => {
    //                     await firebase.auth().currentUser.getIdToken(true)
    //                     }, 2000)
    //                 console.log("refreshed")
    //               } else {
    //                 console.log("smh")
    //                 router.push('/')
    //                 await firebase.auth().signOut()
    //                 console.log("get out of here")
    //               }
    //         }
    //     }
        
    //     checkEmail()
    // }, [isAuthenticated])

    

    return (
        <AuthContext.Provider value={{ user, pushToLanding }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default Auth