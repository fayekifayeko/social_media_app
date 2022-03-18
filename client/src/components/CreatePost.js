
import React from 'react';
import {Button, Form} from 'semantic-ui-react';
import {useForm} from '../hooks/useForm';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export function CreatePost() {
    const {handleSubmit, onChange, values} = useForm(createPostCallBack, {
        body: ""
    })

    const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body) {
      id
      body
      createdAt
      userName
      likes {
        id
        userName
        createdAt
      }
      likeCount
      comments {
        id
        body
        userName
        createdAt
      }
      commentCount
    }
    }
    `

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION,{
        update(proxy, result) {
            console.log(result)
            values.body = '';
        },
        variables: values
    }
       
        )

        function createPostCallBack() {
            createPost();
        }

    return(
        <Form onSubmit={handleSubmit} >
             <h2>Create post</h2>
            <Form.Field>
                <Form.Input 
                placeHolder="Write a post..."
                value={values.body}
                name="body"
                onChange={onChange}
                />
            </Form.Field>
            <Button type="submit" color="teal">Create post</Button>
        </Form>
    )
}