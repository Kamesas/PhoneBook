import React, { Component } from "react";
import { connect } from "react-redux";
import { removeContact } from "../actions/actionContacts";
import { updateContact } from "../actions/actionContacts";


class ContactInfo extends Component {

  state = {
    edit: false,
    nameEdit: "",
    phoneEdit: ""
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

    const start = <p>
                    <span> name: {this.props.name} </span><br/>         
                    <span> telNum: {this.props.telNum} </span>
                    <button onClick={() => this.handleRemoveClick(this.props.contactId)} >&times;</button>
                    <button onClick={() => this.handleUpdateClick(this.props.contactId, {name: this.props.name, phone: this.props.telNum } )} >Edit</button>                             
                  </p>;
    const editInputs = <div>
                        <input type="text" name="name" value={this.state.nameEdit} onChange={this.nameEditChange} />
                        <input type="tel" name="tel" value={this.state.phoneEdit} onChange={this.phoneEditChange} />
                        <button onClick={this.handleSave}>Save</button> 
                      </div>;

    return (
      <div>

        { !this.state.edit ? start : editInputs }                
        <hr/>

      </div>
    );
  }
}

export default connect(null, { removeContact, updateContact })(ContactInfo);