import React, { Component } from "react";
import { connect } from "react-redux";

import { removeContact, updateContact } from "../actions/actionContacts";
//import {  } from "../actions/actionContacts";

import Contact from '../components/Contact'
import ContactEdit from '../components/ContactEdit';


class ContactContainer extends Component {

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
    return (

      <div>

        {

          !this.state.edit ?

            <Contact
              nameContact={this.props.name}
              avatarUrl={this.props.avatarUrl}
              telNum={this.props.telNum}
              remove={() => this.handleRemoveClick(this.props.contactId)}
              update={() => this.handleUpdateClick(this.props.contactId, {name: this.props.name, phone: this.props.telNum } )}
            />

           :           

            <ContactEdit
              nameValue={this.state.nameEdit}
              nameEditChange={this.nameEditChange}
              phoneValue={this.state.phoneEdit}
              phoneEditChange={this.phoneEditChange}
              btnSave={this.handleSave}
            />

        }         
        
      </div>
    );
  }
}

export default connect(null, { removeContact, updateContact })(ContactContainer);