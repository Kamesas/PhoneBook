import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "./actions/actionContacts";
import ContactInfo from "./components/contactInfo";
import axios from "axios";
import {storage} from "./config/firebase";

class App extends Component {

  constructor(){
    super()
    this.state = {    
      nameValue: '',
      phoneValue: '',
      searchValue: '',
      displayContacts: '',
      inputError: 'initial',
      fileName: '',
      imgFireStorage: ''
    };
    //this.getImage('I-am2');
  }

  getImage (image) {    
    storage.child(`${image}`).getDownloadURL().then((url) => {

      this.setState({
        imgFireStorage: url
      });
      console.log('imgFireStorage1 - ', this.state.imgFireStorage)
      
    }).catch((error) => {
      console.log('error')
      console.log('imgFireStorage --- ', this.state.imgFireStorage)
    })
  }  

  fileSelectedHandler = (e) => {
    console.log(e.target.files[0]);
    let nameFile = e.target.files[0].name;
    this.setState({
      selectedFile: e.target.files[0],
      fileName: nameFile
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

  nameChange = (e) => {
    this.setState({
      nameValue: e.target.value
    });
  }

  phoneChange = (e) => {
    const rexExp = /^(\d){0,15}$/ ;   
    if (e.target.value.search(rexExp) !== -1) {
      this.setState({
        phoneValue: e.target.value,
        inputError: 'green'        
      });
    }else{
      this.setState({       
        inputError: 'red'
      });     
    }

    // this.setState({
    //   phoneValue: e.target.value.replace(/[^\d]/g,'').substr(0,15) 
    // });
    
  }

  addContact = () => {
    if (this.state.nameValue !== "" && this.state.phoneValue !== "") {
      this.props.addContact({ name: this.state.nameValue, phone: this.state.phoneValue, urlImg: this.state.imgFireStorage});
      this.setState({
        nameValue: '',
        phoneValue: '',
        inputError: 'initial',
        imgFireStorage: '',
        fileName: ''
      });
    }else{
      alert('Заполните поля!')
    }
     
  } 

  handleSearch = (e) => {   
    const arrContact =  _.map(this.props.contactStore, (value, index) => 
                          <ContactInfo key={index} contactId={index} name={value.name} telNum={value.phone}/>
                        );
   
    const displayContacts = arrContact.filter((el) =>      
      el.props.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
      el.props.telNum.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    ); 

    this.setState({
      searchValue: e.target.value,
      displayContacts: displayContacts
    });

    console.log(displayContacts)

  }

  componentWillMount() {
    this.props.fetchContacts();    
  } 

  render() { 

    const startListContact = _.map(this.props.contactStore, (value, index) => 
              <ContactInfo key={index} contactId={index} name={value.name} telNum={value.phone} avatarUrl={value.urlImg}/>         
            );   

    return (
      <div className="App">         
        <input type="text" onChange={this.handleSearch} placeholder="search"/>            
        <br/>
        <input type="text" value={this.state.nameValue} onChange={this.nameChange} placeholder="name" />  
        <input type="text" value={this.state.phoneValue} onChange={this.phoneChange} style={{borderColor: this.state.inputError}} placeholder="only digits" />
        <input type="file" onChange={this.fileSelectedHandler}/>
        <button onClick={this.fileUploadHandler}>Upload</button><br/>
        <button onClick={() => this.getImage (this.state.fileName)}><i>getImage</i></button>
        <button onClick={this.addContact}>Add contact</button>
        <hr/><hr/>
        
        { this.state.searchValue === '' ? startListContact : this.state.displayContacts }             
        
      </div>
    );
  }
}

const mapStateToProps = ({contactReducer}) => {
  return {
    contactStore: contactReducer    
  };
};

export default connect(mapStateToProps, actions)(App);