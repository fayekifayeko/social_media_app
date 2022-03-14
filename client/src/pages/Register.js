import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Register() {
    const [values, setValues] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const[addUser, {loading}]  = useMutation(REGISTER_USER_MUTATION,
        {
            update(proxy, result) {
                console.log(result);
            },
            variables: values
        }
        )

    const onChange = (e) => setValues({...values, [e.target.name]: e.target.value});
const onSubmit = () => {

}

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
        <div>
            <Form onSubmit={handleSubmit} noValidate>
                <h1>Register</h1>
            <Form.Input label='User name' placeholder='Username' name='userName'  value={values.userName} onChange={onChange}/>

            <Form.Input label='Email' placeholder='Email...' name='email'  value={values.email} onChange={onChange}/>

            <Form.Input label='Password' placeholder='Password...' name='password'  value={values.password} onChange={onChange}/>
            <Form.Input label='Confirm password' placeholder='Confirm password' name='confirmPassword'  value={values.confirmPassword} onChange={onChange}/>

    <Button type='submit' primary>Register</Button>
  </Form>
        </div>
    )
}

export default Register;