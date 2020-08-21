import React, { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase'

const AuthContext = createContext({});

const Auth = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [pushToLanding, setPushToLanding] = useState(false)
    const router = useRouter()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user)
                setIsAuthenticated(true)
                console.log(user)
            } else {
                console.log("pushing...")
                router.push('/')
                console.log("pushed")
            }
        })
    }, [])

    useEffect(() => {
        const checkEmail = async () => {
            if (isAuthenticated) {
                console.log(/.+@nwplus\.io$/.test(user.email))
                if (/.+@nwplus\.io$/.test(user.email)) {
                    setPushToLanding(true)
                    setTimeout(async () => {
                        await firebase.auth().currentUser.getIdToken(true)
                        }, 2000)
                    console.log("refreshed")
                  } else {
                    console.log("smh")
                    router.push('/')
                    await firebase.auth().signOut()
                    console.log("get out of here")
                  }
            }
        }
        
        checkEmail()
    }, [isAuthenticated])

    const googleSignIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
          'hd': 'nwplus.io'
        })
    
        try {
          await firebase.auth().signInWithPopup(provider)
        } catch (error) {
          console.log(error.message)
          alert(error.message)
        }
    }

    return (
        <AuthContext.Provider value={{ pushToLanding, user, googleSignIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default Auth