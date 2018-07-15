import React, { Component } from "react";
import { connect } from "react-redux";
import { removeContact } from "../actions/actionContacts";
import { updateContact } from "../actions/actionContacts";
import axios from "axios";
import {storage} from "../config/firebase";


class ContactInfo extends Component {

  constructor(){
    super()
    this.state = {
      edit: false,
      nameEdit: "",
      phoneEdit: "",
      selectedFile: null,
      imgFireStorage: ""  
    }
    this.getImage('I-am2')
  }

 getImage (image) {
    //let { state } = this
    storage.child(`${image}.jpg`).getDownloadURL().then((url) => {
      //this.state.lithuania = url
      this.setState({
        imgFireStorage: url
      });
      console.log('imgFireStorage1 - ', this.state.imgFireStorage)
    }).catch((error) => {
      console.log('error')
      console.log('imgFireStorage --- ', this.state.imgFireStorage)
    })
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
    axios.post('https://us-central1-react-redux-firebase-1-77d47.cloudfunctions.net/uploadFile', formData, {
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total, progressEvent)
      }    
    });

  }

  render() {

    const start = <p>
                    <span> name: {this.props.name} </span><br/>         
                    <span> telNum: {this.props.telNum} </span><br/>
                    <img src={ this.state.imgFireStorage } alt="imgFireStorage" />

                    <input type="file" onChange={this.fileSelectedHandler}/>
                    <button onClick={this.fileUploadHandler}>Upload</button><br/>
                    <button onClick={this.urlImg}>urlImg</button>

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