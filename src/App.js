import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "./actions/actionContacts";
import ContactInfo from "./components/contactInfo";

class App extends Component {

  state = {    
    nameValue: '',
    phoneValue: '',
    searchValue: '',
    displayContacts: ''
  } 

  nameChange = (e) => {
    this.setState({
      nameValue: e.target.value
    });
  }

  phoneChange = (e) => {
    this.setState({
      phoneValue: e.target.value
    });
  }

  addContact = () => {
   this.props.addContact({ name: this.state.nameValue, phone: this.state.phoneValue});
   this.setState({
    nameValue: '',
    phoneValue: ''
   });
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
              <ContactInfo key={index} contactId={index} name={value.name} telNum={value.phone}/>         
            );   

    return (
      <div className="App"> 

        <input type="text" onChange={this.handleSearch} placeholder="search"/>            
       
        <input type="text" value={this.state.nameValue} onChange={this.nameChange} />  
        <input type="text" value={this.state.phoneValue} onChange={this.phoneChange} />
        <button onClick={this.addContact}>Add contact</button>
        <ul>
          
        </ul>
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