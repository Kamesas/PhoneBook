import React from 'react'
import { Input, Form, Button, Icon } from 'semantic-ui-react'

const ContactEdit = (props) => ( 
     
    <React.Fragment>
    	<Form>

    	  <Form.Field>
    	    <label>Имя</label>
    	    <Input placeholder='имя контакта ...' value={props.nameValue} onChange={props.nameEditChange}/>
    	  </Form.Field>

    	  <Form.Field>
    	    <label>Номер телефона</label>
    	    <Input placeholder='номер телефона ...' value={props.phoneValue} onChange={props.phoneEditChange} />
    	  </Form.Field>

    	  <Form.Field>
    	    <label>Аватар</label>
    	    <Input placeholder='номер телефона ...' value={props.phoneValue} onChange={props.phoneEditChange} />
    	  </Form.Field>

    	  <Button type='submit' positive size='mini' onClick={props.btnSave} ><Icon name='save' />Сохранить</Button>

    	</Form>
    	<hr/>   
    </React.Fragment>

)

export default ContactEdit