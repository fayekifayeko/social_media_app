import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useForm} from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext';

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const initialState = {
        userName: '',
        password: '',
    };
    const LOGIN_USER_MUTATION = gql`
    mutation login(
        $userName: String!, 
        $password: String!, 
        ){
            login(
             userName: $userName, password: $password
        ){
            id
          email
          userName
          createdAt
          token
        }
    }
    `

    /*const {onChange, handleSubmit, values} = useForm(addUser, initialState)  
    addUser will not recognized here
    because it is a const and declared after
    so will make it a function to be recognized
    as functions are calculated when the app starts 
    ut const not */
    const {onChange, handleSubmit, values} = useForm(loginUser, initialState)
    const[login, {loading}]  = useMutation(LOGIN_USER_MUTATION,
        {
            update(proxy, {data: {login: userData}}) {
                context.login(userData);
                props.history.push('/')
            },
         onError(err) {

                setErrors(err.graphQLErrors[0].extensions.errors)
            },
            variables: values
        }
        )

        function loginUser() { // will be recognized above brfore its declaration as it is a function not a const
            login();
          }
   /*  const onChange = (e) => setValues({...values, [e.target.name]: e.target.value});

    const handleSubmit = (e) => {
e.preventDefault();
addUser(); // will trigger the mutation above
} */



    return(
        <div className="form-container">
            <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
            <Form.Input error={!!errors.userName} label='User name' placeholder='Username' name='userName' type="text" value={values.userName} onChange={onChange}/>
            <Form.Input error={!!errors.password} label='Password' placeholder='Password...' name='password' type="password" value={values.password} onChange={onChange}/>
    <Button type='submit' primary>Login</Button>
  </Form>
  {Object.keys(errors).length > 0 && (
  <div className='ui error message'>
      <ul className='list'>
          {Object.values(errors).map(value => (
              <li  key={value}>{value}</li>
          ))}
      </ul>
  </div>)}
        </div>
    )
}

export default Login;