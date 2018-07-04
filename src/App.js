import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "./actions/actionContacts";

class App extends Component {

  state = {
    nameValue: ''
  }

  nameChange = (e) => {
    this.setState({
      nameValue: e.target.value
    });
  }

  addContact = () => {
   this.props.addContactDispatch(this.state.nameValue);
   this.setState({
    nameValue: ''
   });
  }

  componentWillMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.nameValue} onChange={this.nameChange} />
        <button onClick={this.addContact}>Add contact</button>
        <ul>
          {this.props.contactStore.map((contact, index) =>
            <li key={index}>{contact}</li>
          )}
          <hr/>
          { _.map(this.props.contactStore, (value, key) => 
                <li key={key}>{value}</li>         
          )}
        </ul>
      </div>
    );
  }
}

/*export default connect(

  state => ({
    contactStore: state.contactReducer
  }),

  dispatch => ({
    addContactDispatch: (contact) => {
      dispatch({type: 'ADD_CONTACT', payload: contact})
    }
  })

)(App);*/

const mapStateToProps = ({contactReducer}) => {
  return {
    contactStore: contactReducer
  };
};

export default connect(mapStateToProps, actions)(App);