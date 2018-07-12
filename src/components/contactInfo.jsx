import React, { Component } from "react";
import { connect } from "react-redux";
import { removeContact } from "../actions/actionContacts";
import { updateContact } from "../actions/actionContacts";
import axios from "axios";


class ContactInfo extends Component {

  state = {
    edit: false,
    nameEdit: "",
    phoneEdit: "",
    selectedFile: null   
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

  fileSelectedHandler = (e) => {
    console.log(e.target.files[0]);
    this.setState({
      selectedFile: e.target.files[0] 
    });
  }

  fileUploadHandler = () => {
    const formData = new FormData()
    formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name)
    //axios.post('https://us-central1-react-redux-firebase-1-77d47.cloudfunctions.net/helloWorld')
    axios.post('https://us-central1-react-redux-firebase-1-77d47.cloudfunctions.net/myRequest', formData, {
    onUploadProgress: progressEvent => {
      console.log(progressEvent.loaded / progressEvent.total)
    }
  })
  }

  render() {

    const start = <p>
                    <span> name: {this.props.name} </span><br/>         
                    <span> telNum: {this.props.telNum} </span><br/>

                    <input type="file" onChange={this.fileSelectedHandler}/>
                    <button onClick={this.fileUploadHandler}>Upload</button><br/>

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