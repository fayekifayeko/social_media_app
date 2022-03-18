import React, {useContext} from 'react';

import { Grid } from 'semantic-ui-react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../context/AuthContext';

import PostCard from '../components/PostCard';
import {CreatePost} from '../components/CreatePost';


function Home() {
  const {userData} = useContext(AuthContext);

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
        {userData && (
        <Grid.Column>
          <CreatePost />
        </Grid.Column>)}
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