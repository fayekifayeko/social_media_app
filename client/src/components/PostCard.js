import React from 'react';
import moment from 'moment';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function PostCard({post: { body, createdAt, id, userName, likeCount, commentCount, likes}}) {

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
           <h1>buttons here</h1>
          </Card.Content>
        </Card>
    )
}