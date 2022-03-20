import React, { useContext } from 'react';
import moment from 'moment';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {LikeButton} from '../components/LikeButton';
import {DeleteButton} from '../components/DeleteButton';

export default function PostCard({post: { body, createdAt, id, userName, likeCount, commentCount, likes}}) {
  const { userData: user } = useContext(AuthContext);

    return(
        <Card fluid>
          <Card.Content>
            <Image
              floated='right'
              size='mini'
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            />
            <Card.Header>{userName}</Card.Header>
            <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)} {/* true removes ago word */}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
        </Card.Content>
          <Card.Content extra>
          <div>
   <LikeButton user={user} post={{likeCount, id, likes}} />
    <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
      <Button basic color='blue'>
        <Icon name='comments' />
      </Button>
      <Label as='a' basic color='blue' pointing='left'>
        {commentCount}
      </Label>
    </Button>
    {user&&user.userName===userName&&<DeleteButton />} {/* if the logged user is the post owner */}
  </div>
    </Card.Content>
        </Card>
    )
}