import React, { Component } from "react";
import { connect } from "react-redux";
import { removeContact } from "../actions/actionContacts";
import { updateContact } from "../actions/actionContacts";
import ButtonurlImg from "./button";
import ContactEdit from './ContactEdit';
import { Button, Image, List, Icon, Checkbox, Form } from 'semantic-ui-react';
import Contact from './Contact'


class ContactInfo extends Component {

  state = {
    edit: false,
    nameEdit: "",
    phoneEdit: "",
    selectedFile: null,
    imgFireStorage: ""  
  }
 
 
  handleRemoveClick = (removeContact) => {    
    this.props.removeContact(removeContact);
  };

  editContact = () => {
    this.setState({
      edit: true
    });
  }

  nameEditChange = (e) => {
    console.log(typeof(e.target.value))
    this.setState({            
      nameEdit: e.target.value      
    });
  } 

  phoneEditChange = (e) => {
    this.setState({            
      phoneEdit: e.target.value    
    });
  }

  handleUpdateClick = (id, data) => { 

    this.setState({
      edit: true,
      nameEdit: data.name,
      phoneEdit: data.phone      
    });  

    this.handleSave = () => {
      this.setState({
        edit: false      
      }); 

      data.name = this.state.nameEdit;
      data.phone = this.state.phoneEdit;
      this.props.updateContact(id, data);
    }    
   
  };

  render() {

    const start = <div>
                    <span> name: {this.props.name} </span><br/>                          
                    <span> telNum: {this.props.telNum} </span><br/>                   
                    <img src={this.props.avatarUrl} alt="alt"/>

                    <input type="file" onChange={this.fileSelectedHandler}/>
                    <button onClick={this.fileUploadHandler}>Upload</button><br/>
                    <button onClick={this.urlImg}>urlImg</button>
                    
                    <button onClick={() => this.handleRemoveClick(this.props.contactId)} >&times;</button>
                    <button onClick={() => this.handleUpdateClick(this.props.contactId, {name: this.props.name, phone: this.props.telNum } )} >Edit</button>                             
                  </div>;

    const editInputs = <div>
                        <input value={this.state.nameEdit} onChange={this.nameEditChange} />                          
                        <input value={this.state.phoneEdit} onChange={this.phoneEditChange} />
                        <button onClick={this.handleSave}>Save</button>                        
                      </div>;

    const editScreen = <ContactEdit
                          nameValue={this.state.nameEdit}
                          nameEditChange={this.nameEditChange}
                          phoneValue={this.state.phoneEdit}
                          phoneEditChange={this.phoneEditChange}
                          btnSave={this.handleSave}
                       />

    const startScreen = <Contact
                          nameContact={this.props.name}
                          avatarUrl={this.props.avatarUrl}
                          telNum={this.props.telNum}
                          remove={() => this.handleRemoveClick(this.props.contactId)}
                          update={() => this.handleUpdateClick(this.props.contactId, {name: this.props.name, phone: this.props.telNum } )}
                        />

    return (
      <div>      

        { !this.state.edit ? startScreen : editScreen }                
        <hr/>   
        
      </div>
    );
  }
}

export default connect(null, { removeContact, updateContact })(ContactInfo);