import React, { useState } from 'react';
import gql from 'graphql-tag';
import {
    Button,
    Icon,
    Confirm
  } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../utils/qraphgql';

export function DeleteButton({postId, callBack}) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deletePost] = useQuery(DELETE_POST_MUTATION, {
        update(proxy) {
            setConfirmOpen(false);
            if(callBack) callBack();
            // remove post from the cache
            const chachedData = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })

            chachedData.getPosts = chachedData.filter(item => item.id !==postId);
            proxy.writeQuery({query: FETCH_POSTS_QUERY,chachedData});
        },
        variables: {postId}
    })

    return(
        <>
        <Button as='div' floated='right' color='red' onClick={() => setConfirmOpen(true)}>
        <Icon name='trash' style={{margin: 0}} />
    </Button>
    <Confirm 
    open={confirmOpen}
    onCancel={() => setConfirmOpen(false)}
    onActionClick={() => deletePost}
    />
    </>
    )
}

const DELETE_POST_MUTATION = gql`
mutation deletPost(postId: ID!){
    deletePost(postId: $postId)
}
`