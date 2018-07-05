import React, { Component } from "react";
import { connect } from "react-redux";
import { removeContact } from "../actions/actionContacts";


class ContactInfo extends Component {

  handleCompleteClick = (removeContact) => {    
    this.props.removeContact(removeContact);
  };

  render() {
    return (
      <div>

        <p>
          <span> name: {this.props.name} </span><br/>         
          <span> telNum: {this.props.telNum} </span>
          <button onClick={() => this.handleCompleteClick(this.props.contactId)} >&times;</button>
        </p>        
        <hr/>

      </div>
    );
  }
}

export default connect(null, { removeContact })(ContactInfo);