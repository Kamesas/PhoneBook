import React, { Component } from 'react';
import { connect } from "react-redux";

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
   console.log(this.props.contactStore) 
  }

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.nameValue} onChange={this.nameChange} />
        <button onClick={this.addContact}>Add contact</button>
        <ul>
          {this.props.contactStore.map(contact =>
            <li>{contact}</li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contactStore: state
  };
};

export default connect(mapStateToProps, null)(App);

/*export default connect(
  state => ({
    contactStore: state
  }),
  dispatch => ({})
)(App);*/
