import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const onEnter = evt => {
      if(evt.keyCode == 13){
        const messageInput = evt.target
        this.props.addMessage(messageInput.value)
        messageInput.value = '';
      }
    }
    return(
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" name = "username"/>
        <input type = "text" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown ={onEnter} />
      </footer>
    )
  }
}

export default ChatBar