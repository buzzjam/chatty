import React, { Component } from "react";
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

class MessageList extends Component {
  render() {
    const allMessages = this.props.messages.map((message, index) => {
      if (message.type === "incomingMessage") {
        return (
          <Message
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
