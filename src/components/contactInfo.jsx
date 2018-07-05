import React, { Component } from "react";


class ContactInfo extends Component {

  render() {
    return (
      <div>

        <p>
          <span> name: {this.props.name} </span><br/>         
          <span> telNum: {this.props.telNum} </span>
        </p>        
        <hr/>

      </div>
    );
  }
}

export default ContactInfo;