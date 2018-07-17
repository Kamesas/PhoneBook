import React from 'react'
import { Input, Form, Button } from 'semantic-ui-react'

const AddContact = (props) => ( 
     
    <React.Fragment>
    	<Form>

    	  <Form.Field>
    	    <label>Имя</label>
    	    <Input placeholder='имя контакта ...' value={props.nameValue} onChange={props.nameChange}/>
    	  </Form.Field>

    	  <Form.Field>
    	    <label>Номер телефона</label>
    	    <Input placeholder='номер телефона ...' value={props.phoneValue} onChange={props.phoneChange} ><input style={props.errInputsStyle} /></Input>           
    	  </Form.Field>

    	  <Form.Field>
    	    <label>Аватар</label>
    	    <Input type="file"  onChange={props.fileSelect} />
            <Button color="blue" size='mini' onClick={props.btnFileUpload} >Загрузить</Button>
    	  </Form.Field>

    	  <Button type='submit' positive size='mini' onClick={props.btnAddContact} >Добавить контакт</Button>

    	</Form>
    	<hr/>   
    </React.Fragment>

)

export default AddContact