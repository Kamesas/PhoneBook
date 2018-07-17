import React from 'react'
import { Button, Image, List, Icon } from 'semantic-ui-react'

const Contact = (props) => (

  <List divided verticalAlign='middle'>
    <List.Item>

      <List.Content floated='right'>
        <Button.Group>
          <Button size='mini' color="red" onClick={props.update}><Icon name='edit outline'/></Button>
          <Button.Or size='mini' text="&" />
          <Button positive size='mini' onClick={props.remove}><Icon name='remove'/></Button>
        </Button.Group>
      </List.Content>

      <Image avatar src={props.avatarUrl} />

      <List.Content>
         <List.Header as='a'>{props.nameContact}</List.Header>
          <List.Description>
            <Icon name='phone' size='small'/>{props.telNum}
          </List.Description>
      </List.Content>

    </List.Item> <hr/>   
  </List>

)

export default Contact