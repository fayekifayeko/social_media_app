import React from 'react';

import { Grid } from 'semantic-ui-react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import PostCard from '../components/PostCard';

function Home() {

 const FETCH_POSTS_QUERY = gql`
    {
      getPosts {
        id
        body
        createdAt
        userName
        likeCount
        likes {
            userName
        }
        commentCount
        comments {
          id
          userName
          createdAt
          body
        }
      }
    }
  `;
const {
    loading,
    data: { getPosts: posts }
  } = useQuery(FETCH_POSTS_QUERY);
    return(
        <Grid columns='three'>
        <Grid.Row>
        <h1>Recent posts</h1>
        </Grid.Row>
        <Grid.Row>
        {!loading ? (
            posts?.map(item => (
                <Grid.Column key={item.id} style={{ marginBottom: 20 }}>
                <PostCard post={item} />
              </Grid.Column>
            ))
        )
        :
        <h1>Loading.....</h1>}
        </Grid.Row>
      </Grid>
    )
}

export default Home;