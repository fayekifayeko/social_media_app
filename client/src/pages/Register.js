import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useForm} from '../hooks/useForm';

function Register(props) {
    const [errors, setErrors] = useState({});
    initialState = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };
    /*const {onChange, handleSubmit, values} = useForm(addUser, initialState)  
    addUser will not recognized here
    because it is a const and declared after
    so will make it a function to be recognized
    as functions are calculated when the app starts 
    ut const not */

    const {onChange, handleSubmit, values} = useForm(registerUser, initialState)
    const[addUser, {loading}]  = useMutation(REGISTER_USER_MUTATION,
        {
            update(proxy, result) {
                console.log(result);
                props.history.push('/')
            },
            onError(err) {
                setErrors(err.graphQLErrors[0].extensions.exception.errors)
            },
            variables: values
        }
        )

        function registerUser() { // will be recognized above brfore its declaration as it is a function not a const
            addUser();
          }
   /*  const onChange = (e) => setValues({...values, [e.target.name]: e.target.value});

    const handleSubmit = (e) => {
e.preventDefault();
addUser(); // will trigger the mutation above
} */

const REGISTER_USER_MUTATION = gql`
mutation register(
    $userName: string!, 
    $email: String!, 
    $password: String!, 
    $confirmPassword: String
    ){
    register(
        registerInput: {userName: $userName, email: $email, password: $password, confirmPassword: $confirmPassword}
    ){
        id
      email
      username
      createdAt
      token
    }
}
`

    return(
        <div className="form-container">
            <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
            <Form.Input error={!!errors.userName} label='User name' placeholder='Username' name='userName' type="text" value={values.userName} onChange={onChange}/>

            <Form.Input error={!!errors.email} label='Email' placeholder='Email...' name='email' type="email"  value={values.email} onChange={onChange}/>

            <Form.Input error={!!errors.password} label='Password' placeholder='Password...' name='password' type="password" value={values.password} onChange={onChange}/>
            <Form.Input error={!!errors.confirmPassword} label='Confirm password' placeholder='Confirm password' type="password" name='confirmPassword'  value={values.confirmPassword} onChange={onChange}/>

    <Button type='submit' primary>Register</Button>
  </Form>
  {Object.keys(errors).lenght > 0 && (
  <div className='ui error messgae'>
      <ul className='list'>
          {Object.values(errors).map(value => (
              <li  key={value}>{value}</li>
          ))}
      </ul>
  </div>)}
        </div>
    )
}

export default Register;