import React from 'react';
import moment from 'moment';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function PostCard({post: { body, createdAt, id, userName, likeCount, commentCount, likes}}) {

  function likePost() {
    console.log('like');
  }

  function commentPost() {
    console.log('comment');
  }

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
    <Button basic as='div' labelPosition='right' onClick={likePost}>
      <Button basic color='teal'>
        <Icon name='heart' />
      </Button>
      <Label as='a' basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
    <Button as='div' labelPosition='right' onClick={commentPost}>
      <Button basic color='blue'>
        <Icon name='comments' />
      </Button>
      <Label as='a' basic color='blue' pointing='left'>
        {commentCount}
      </Label>
    </Button>
  </div>
    </Card.Content>
        </Card>
    )
}