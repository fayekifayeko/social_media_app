import React, {useContext} from 'react';

import { Grid, Transition  } from 'semantic-ui-react';

import { useQuery } from '@apollo/react-hooks';
import {FETCH_POSTS_QUERY} from '../utils/gql';
import { AuthContext } from '../context/AuthContext';

import PostCard from '../components/PostCard';
import {CreatePost} from '../components/CreatePost';


function Home() {
  const {userData} = useContext(AuthContext);

const {
    loading,
    data: { getPosts: posts }
  } = useQuery(FETCH_POSTS_QUERY); // will triggered when ts related cach is updated(t.ex: createPost component)
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
          <Transition.Group> {/* some animation when add or delete a post */} 
            {posts?.map(item => (
                <Grid.Column key={item.id} style={{ marginBottom: 20 }}>
                <PostCard post={item} />
              </Grid.Column>
            ))}
            </Transition.Group>
        )
        :
        <h1>Loading.....</h1>}
        </Grid.Row>
      </Grid>
    )
}

export default Home;