import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component { 
  render() {
    const allMessages = this.props.messages.map(message => (
      <Message message={message.content} key={message.id} username={message.username}/>
    ))

    return (
      <main className="messages">
          <div>
            {allMessages}
          </div>
      </main>
    )
  }
}

export default MessageList