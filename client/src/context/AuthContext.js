
import React, {createContext, useReducer} from 'react';

//  context not redux as the app data is small, just a user data
const AuthContext = createContext({
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
    const [state, dispatch] = useReducer(AuthReducer, {
        userData: null
    })

    const login = (data) => {
        dispatch({type: 'LOGIN', payload: data})
    }
    const logout = (data) => {
        dispatch({type: 'LOGOUT'})
    }

    return (
        <AuthContext.Provider
         value={{userData: state.userData, login, logout}}
         {...props}
         />
    )
}
