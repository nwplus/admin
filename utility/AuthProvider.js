import { useContext, createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, getHackathons } from './firebase';

const AuthContext = createContext();

export function AuthProvider(props) {
    if (!process.browser) {
        return (
            <AuthContext.Provider value={null}>{props.children}</AuthContext.Provider>
        );
    }
    const router = useRouter();
    const [user, setUser] = useState();

    auth.onAuthStateChanged(async newUser => {
        if (!newUser) {
            router.push('/');
            return;
        }
        const idToken = await newUser.getIdTokenResult();
        const hackathons = await getHackathons();

        if (idToken.claims.admin) {
            setUser(newUser);
            router.push(`/${hackathons[0]}`);
        } else {
            setUser(null);
            router.push('/');
        }
    });

    useEffect(() => {
        if (router.asPath !== '/' && user == null) {
            router.push('/');
        } else if (router.asPath === '/' && user != null) {
            router.push('/TestIntroHackathon');
        }
    }, [user, router.asPath]);

    return (
        <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
