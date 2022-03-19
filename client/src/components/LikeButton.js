import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';

export function LikeButton({user, post: {likeCount, id, likes}}) {
    const [alreadyLiked, setAlreadyLiked] = useState(false);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id}
    })
    
    useEffect(() => {
        if(user&&likes.find(item => item.userName===user.userName)) {
            setAlreadyLiked(true)
        } else setAlreadyLiked(false)
    }, [likes, user])



    const likeButton = user ? 
    alreadyLiked ? (
        <Button  as='div' labelPosition='right' onClick={likePost}>
        <Button  color='teal'>
          <Icon name='heart' />
        </Button>
        <Label as='a' basic color='teal' pointing='left'>
          {likeCount}
        </Label>
      </Button>
    ) : (
        <Button basic as='div' labelPosition='right' onClick={likePost}>
        <Button basic color='teal'>
          <Icon name='heart' />
        </Button>
        <Label as='a' basic color='teal' pointing='left'>
          {likeCount}
        </Label>
      </Button>
    )
    :(
        <Button basic as={Link} to='/login' labelPosition='right'>
        <Button basic color='teal'>
          <Icon name='heart' />
        </Button>
        <Label as='a' basic color='teal' pointing='left'>
          {likeCount}
        </Label>
      </Button>
    )

    return likeButton;
}


/* 
this mutation returns a type Post, so
Apollo client will know that it needs to update the cached post that has this id with the data which we need in this mutation 
               such as likes, likeCount
               so the ui in Home page will update automatically without to do anything */
const LIKE_POST_MUTATION = gql` 
mutation likePost($postId: ID!){
    likePost(postId: $postId){
        id   
  likes {
    id
    userName
  }
  likeCount
}
    }
`