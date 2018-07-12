import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameValue: "",
      msgValue: ""
    };
  }

  render() {
    return(
      <footer className="chatbar">

        <input onChange={this.props.userOnChange} 
        onKeyPress = {this.props.submitUser} defaultValue ={this.props.currentUser} className="chatbar-username"/>

        <input  onChange={this.props.messageOnChange} 
        onKeyPress = {this.props.submitMessage} className="chatbar-message" />

      </footer>
    )
  }
}

export default ChatBar