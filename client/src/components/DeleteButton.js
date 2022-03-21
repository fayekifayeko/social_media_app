import React, { useState } from 'react';
import gql from 'graphql-tag';
import {
    Button,
    Icon,
    Confirm
  } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../utils/qraphgql';
import {MyPopup} from './MyPopup';

export function DeleteButton({postId, commentId, callBack}) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const deleteMutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
    const [deleteCallback] = useMutation(deleteMutation, {
        update(proxy) {
            setConfirmOpen(false);

            if(!commentId) {  // when delete a comment, Apollo will updatethe post auto in the cach and delete the comment
       // remove post from the cache
       const chachedData = proxy.readQuery({
        query: FETCH_POSTS_QUERY
    })

    chachedData.getPosts = chachedData.getPosts.filter(item => item.id !==postId);
    console.log('ppppppppppppppppp', chachedData)
    proxy.writeQuery({ query: FETCH_POSTS_QUERY, chachedData });
    console.log('vvvvvvvvvvvv', chachedData)

}
            if(callBack) {
                callBack();
            }


        },
        variables: {
            postId,
        commentId
        }
    })

    return(
        <>
        <MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
        <Button as='div' floated='right' color='red' onClick={() => setConfirmOpen(true)}>
        <Icon name='trash' style={{margin: 0}} />
    </Button>
    </MyPopup>
    <Confirm 
    open={confirmOpen}
    onCancel={() => setConfirmOpen(false)}
    onConfirm={deleteCallback}
    />
    </>
    )
}

const DELETE_POST_MUTATION = gql`
mutation deletPost($postId: ID!){
    deletePost(postId: $postId)
}
`

const DELETE_COMMENT_MUTATION = gql`
mutation deleteComment($postId: ID!, $commentId: ID!){
    deleteComment(postId: $postId, commentId: $commentId){
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