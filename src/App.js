import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "./actions/actionContacts";
import ContactInfo from "./components/contactInfo";

class App extends Component {

  state = {    
    nameValue: '',
    phoneValue: ''
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

  componentWillMount() {
    this.props.fetchContacts();    
  } 

  render() {   

    return (
      <div className="App">             
       
        <input type="text" value={this.state.nameValue} onChange={this.nameChange} />  
        <input type="text" value={this.state.phoneValue} onChange={this.phoneChange} />
        <button onClick={this.addContact}>Add contact</button>
        <ul>
          
        </ul>
          { _.map(this.props.contactStore, (value, index) => 
              <ContactInfo key={index} contactId={index} name={value.name} telNum={value.phone}/>         
            )
          }         
        
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