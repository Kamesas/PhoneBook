import React, { Component } from "react";
import { connect } from "react-redux";
import { removeContact } from "../actions/actionContacts";
import { updateContact } from "../actions/actionContacts";


class ContactInfo extends Component {

  handleRemoveClick = (removeContact) => {    
    this.props.removeContact(removeContact);
  };

  handleUpdateClick = (id, data) => {    
    //this.props.updateContact(id, data);
    console.log('update')
  };

  render() {
    return (
      <div>

        <p>
          <span> name: {this.props.name} </span><br/>         
          <span> telNum: {this.props.telNum} </span>
          <button onClick={() => this.handleRemoveClick(this.props.contactId)} >&times;</button>

          <button onClick={() => this.handleUpdateClick(this.props.contactId )} >Edit</button>
         
        </p>        
        <hr/>

      </div>
    );
  }
}

export default connect(null, { removeContact, updateContact })(ContactInfo);