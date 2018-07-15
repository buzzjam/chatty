import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    const allMessages = this.props.messages.map((message, index) => {
      // maps solely the messages to display in the app
      if (message.type === 'incomingMessage') {
        return (
          <Message
            color={message.color}
            message={message.content}
            key={index}
            username={message.username}
          />
        );
      }
      return <Notification message={message.content} key={index} />;
    });

    return <main className="messages">{allMessages}</main>;
  }
}

export default MessageList;
