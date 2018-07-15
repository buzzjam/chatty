import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import NavBar from "./NavBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous", color: "" },
      messages: [],
      usersOnline: 0
    };
    this.addMessage = this.addMessage.bind(this);

    // connects websocket server
    this.socket = new WebSocket("ws://localhost:3001");
    //listens for messages from the websocket server

    this.socket.addEventListener("message", this.receiveMessage);
  }

  addMessage = (message, curUser) => {
    if (message !== undefined) {
      const messageInput = {
        type: "postMessage",
        username: curUser.name,
        color: curUser.color,
        content: message,
      };
      this.socket.send(JSON.stringify(messageInput));
    }
  };

  addUser = user => {
    if (user === undefined || user === "") user = "Anonymous";
    const loggedInUser = this.state.currentUser.name;
    const messageInput = {
      type: "postNotification",
      content: `${loggedInUser} has changed their name to ${user}.`
    };
    this.setState({ currentUser: { name: user, color: this.state.currentUser.color } });
    this.socket.send(JSON.stringify(messageInput));
  };

  // updates state based on user changes
  userOnChange = evt => {
    this.setState({ usernameValue: evt.target.value });
  };
  
   // updates state based on user changes
  messageOnChange = evt => {
    this.setState({ msgValue: evt.target.value });
  };

  submitMessage = evt => {
    if (evt.key == "Enter") {
      this.addMessage(this.state.msgValue, this.state.currentUser);
      evt.target.value = "";
      this.state.msgValue = undefined;
    }
  };

  submitUser = evt => {
    if (evt.key == "Enter") {
      this.addUser(this.state.usernameValue);
    }
  };

  receiveMessage = e => {
    const msg = JSON.parse(e.data);
    console.log(msg)
    switch (msg.type) {
      case "incomingMessage":
      case "incomingNotification":
        const messages = this.state.messages.concat(msg);
        this.setState({ messages });
        break;
      case "usersChanged":
        this.setState({ usersOnline: msg.usersOnline });
        break;
      default:
        throw new Error("Unknown event type " + msg.type);
    }
  };

  render() {
    return (
      <div>
        <NavBar usersOnline={this.state.usersOnline} />
        <MessageList
          messages={this.state.messages}
          color={this.state.currentUser.color}
        />
        <ChatBar
          userOnChange={this.userOnChange}
          messageOnChange={this.messageOnChange}
          submitMessage={this.submitMessage}
          submitUser={this.submitUser}
          currentUser={this.state.currentUser.name}
        />
      </div>
    );
  }
}
export default App;
