
import React, {createContext, useReducer} from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    userData: null
}

if(localStorage.getItem('jwtToken')) { // if you refresh the broweser u will still logged in
const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
console.log(decodedToken)
    if(decodedToken.exp*1000 < Date.now()) localStorage.removeItem('jwtToken')
    else initialState.userData = decodedToken
}

//  context not redux as the app data is small, just a user data
export const AuthContext = createContext({
    userData: null,
    login: (data) => {},
    logout: () => {}
});

const AuthReducer = (state={userData: null}, action) => {
    switch(action.type) {
        case 'LOGIN': // should be constants not hardcoded here
            return {
                ...state,
                userData: action.payload
            }
            case 'LOGOUT': 
            return {
                ...state,
                userData: null
            }
            default: 
            return state
    }
}

export function AuthProvider(props) {
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const login = (data) => {
        localStorage.setItem('jwtToken', data.token)
        dispatch({type: 'LOGIN', payload: data})
    }
    const logout = (data) => {
        localStorage.removeItem('jwtToken')
        dispatch({type: 'LOGOUT'})
    }

    return (
        <AuthContext.Provider
         value={{userData: state.userData, login, logout}}
         {...props}
         />
    )
}
