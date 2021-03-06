import React, { useState, useContext, useRef } from 'react';
import {
    Button,
    Card,
    Form,
    Grid,
    Image,
    Icon,
    Label,
  } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';
import {LikeButton} from '../components/LikeButton';
import {DeleteButton} from '../components/DeleteButton';
import { MyPopup } from '../components/MyPopup';

function SinglePost(props) {
   const postId = props.match.params.postId // the Router will pass this in all children props 
   const { userData: user } = useContext(AuthContext);
   const [comment, setComment] = useState('');
   const commentInputRef = useRef(null);

   let markUp;

   const {data: {getPost}}= useQuery(FETCH_POST_QUERY, {
       variables: {postId}
   });

   const [submitComment]= useMutation(CREATE_COMMENT_MUTATION, {
       update(){
        setComment('')
        commentInputRef.current.blur();
       },
    variables: {
        postId,
        body: comment
    }
});

   const deletePostCallBack = () => {
       props.history.push('/')
    
}

   if (!getPost) {
    markUp = <h1>Loading....</h1>
   } else {
    const {userName, id, likeCount, likes, commentCount, body, createdAt, comments} = getPost;

    markUp = (
        <Grid>
            <Grid.Row>
                <Grid.Column width={2}>
                    <Image 
                    size="small"
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                    float="right"
                    />
                </Grid.Column>
                <Grid.Column width={10}>
                <Card fluid>
          <Card.Content>            
            <Card.Header>{userName}</Card.Header>
            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
        </Card.Content>
        <hr />
          <Card.Content extra>
          <div>
   <LikeButton user={user} post={{likeCount, id, likes}} />
   <MyPopup content='Comment a post'>
    <Button labelPosition='right' as='div' onClick={()=>{}}>
      <Button basic color='blue'>
        <Icon name='comments' />
      </Button>
      <Label as='a' basic color='blue' pointing='left'>
        {commentCount}
      </Label>
    </Button>
    </MyPopup>
    {user&&user.userName===userName&&<DeleteButton postId={postId} callBack={deletePostCallBack}/>}   {/* if the logged user is the post owner  */}
  </div>
    </Card.Content>
        </Card>
        <Card fluid>
            <Card.Content>
                <p>Create a post</p>
                <Form>
                    <div className='ui input action fluid'>  {/* i use a normal html input and buttonand not the semantic input components
                                                             because it doesnt accept ref */}
                        <input
                        placeholder='commet...'
                        onChange={(e) =>setComment(e.target.value)}
                        value={comment}
                        type='text'
                        ref={commentInputRef}
                        />
                    </div>
                    <button
                     type='submit'
                     disabled={!comment}
                     className='ui button teal'
                     onClick={submitComment}
                     >
                         Post a comment
                     </button>
                </Form>
            </Card.Content>

        </Card>
        {comments.map(item => (
                <Card key={item.id} fluid>
                    <Card.Content>
                        {user&&user.userName===item.userName&&<DeleteButton postId={id} commentId={item.id}/>}
                    <Card.Header>{item.userName}</Card.Header>
                    <Card.Meta>{moment(item.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{item.body}</Card.Description>
                    </Card.Content>
                </Card>
        ))}
        </Grid.Column>
            </Grid.Row>
        </Grid>
    )
   }

   return markUp;
}

export default SinglePost;

const FETCH_POST_QUERY = gql`
query getPost($postId: ID!){
    getPost(postId: $postId) {
        id
        createdAt
        body
        userName
        likes {
            userName
        }
        likeCount
        comments {
            id
            createdAt
            body
            userName
        }
    }
}
`

const CREATE_COMMENT_MUTATION = gql`
mutation createComment($postId: ID!, $body: String!){
    createComment(postId: $postId, body: $body){
        id
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