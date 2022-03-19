
import React from 'react';
import {Button, Form} from 'semantic-ui-react';
import {useForm} from '../hooks/useForm';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {FETCH_POSTS_QUERY} from '../utils/gql';

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
           const cachedData= proxy.readQuery({ // read posts from Apollo cach, no need to trigger the api
                query: FETCH_POSTS_QUERY
            })
            cachedData.getPosts = [result.data.getPost, ...cachedData.getPosts] ; // cached data is object wit a key getPosts (Check apollo devtools, cahched option)
            proxy.writeQuery({FETCH_POSTS_QUERY, cachedData}) // add the created post to the cached posts
            values.body = '';
        },
        variables: values
    }
       
        )

        function createPostCallBack() {
            createPost();
        }

    return(
        <>
        <Form onSubmit={handleSubmit} >
             <h2>Create post</h2>
            <Form.Field>
                <Form.Input 
                placeHolder="Write a post..."
                value={values.body}
                name="body"
                onChange={onChange}
                error={!!error}
                />
            </Form.Field>
            <Button type="submit" color="teal">Create post</Button>
        </Form>
        <div className='ui error message' style={{marginBottom: 20}}>
      <ul className='list'>
              <li>{error.graphQLErrors[0].extensions.errors.body}</li>
      </ul>
  </div>
</>
    )}