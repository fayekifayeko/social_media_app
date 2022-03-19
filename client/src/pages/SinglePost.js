import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useForm} from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext';

function SinglePost(props) {
   const postId = props.match.params.postId // the Router will pass this in all children props 

    return(
      <h1>Hi...</h1>
    )
}

export default SinglePost;

/* const FETCH_POST_QUERY = gql`
` */