import React, { useState, useContext } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


export const RedirectToHomeRoute = ({component: Component, ...rest}) => {
    const {userData} = useContext(AuthContext);

    return (
        <Route 
        {...rest}
        render={(props) => (
            userData ? <Redirect to='/' /> : <Component {...props} />
        )}
        />
    )
}