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
   this.props.addContact({ name: this.state.nameValue});
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

          { _.map(this.props.contactStore, (value, index) => 
                <li key={index}>{value.name}</li>         
          )}

        </ul>
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