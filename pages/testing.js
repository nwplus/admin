import React from 'react'
import { useAuth } from '../utility/auth'

export default () => {
    const { user, isAuthenticated } = useAuth()
    console.log(isAuthenticated)
    // return (
    //     <div>{isAuthenticated ? user.email : null}</div>
    // )
    return <div>{user.email}</div>
}