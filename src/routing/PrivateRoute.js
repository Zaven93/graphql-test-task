import React from 'react'
import { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

const authToken = localStorage.getItem('token')

const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log('Auth token from private route', authToken)
    return (
        <Route
            {...rest}
            render={(props) => (!authToken ? <Redirect to="/" /> : <Component {...props} />)}
        />
    )
}

export default PrivateRoute
