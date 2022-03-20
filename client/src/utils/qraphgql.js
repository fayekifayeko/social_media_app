import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      createdAt
      body
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