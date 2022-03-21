import React, { useState } from 'react';
import gql from 'graphql-tag';
import {
    Button,
    Icon,
    Confirm
  } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../utils/qraphgql';
import {Popup} from '../components/Popup';

export function DeleteButton({postId, commentId, callBack}) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const deleteMutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
    const [deleteCallback] = useQuery(deleteMutation, {
        update(proxy) {
            setConfirmOpen(false);
            if(callBack) callBack();

            if(!commentId) {  // when delete a comment, Apollo will updatethe post auto in the cach and delete the comment
       // remove post from the cache
       const chachedData = proxy.readQuery({
        query: FETCH_POSTS_QUERY
    })

    chachedData.getPosts = chachedData.filter(item => item.id !==postId);
    proxy.writeQuery({query: FETCH_POSTS_QUERY,chachedData});
            }
     
        },
        variables: {postId}
    })

    return(
        <Popup content={commentId ? 'Delete comment' : 'Delete post'}>
        <Button as='div' floated='right' color='red' onClick={() => setConfirmOpen(true)}>
        <Icon name='trash' style={{margin: 0}} />
    </Button>
    <Confirm 
    open={confirmOpen}
    onCancel={() => setConfirmOpen(false)}
    onActionClick={() => deleteCallback}
    />
    </Popup>
    )
}

const DELETE_POST_MUTATION = gql`
mutation deletPost($postId: ID!){
    deletePost(postId: $postId)
}
`

const DELETE_COMMENT_MUTATION = gql`
mutation deletComment($postId: ID!, $commentId: ID!){
    mutation deletComment(postId: $postId, commentId: $commentId){
        id,
        comments {
            id
            body
            createdAt
            userName
        }
        commentCount
    }
}
`
// need id so Apollo knows which post to update in the cach automatically, as this mutation returns a Post
// Apollo will update the props abstracted in the mutation(commentCount, comments, .....) or delete them