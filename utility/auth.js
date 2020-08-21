import React, { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase'

const AuthContext = createContext({});

const Auth = ({ children }) => {
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user)
                console.log(user)
            } else {
                console.log("pushing...")
                router.push('/')
                console.log("pushed")
            }
        })
    }, [])

    const googleSignIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
          'hd': 'nwplus.io'
        })
    
        try {
          await firebase.auth().signInWithPopup(provider)
          if (user && /.+@nwplus\.io$/.test(user.email)) {
            //   router.push('/landing')
            
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
        } catch (error) {
          console.log(error.message)
          alert(error.message)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, googleSignIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default Auth