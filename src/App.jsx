import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'},
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener("message", this.receiveMessage);
  }
  
  addMessage = (message, curUser) => {
    const oldMessages = this.state.messages;
    const loggedInUser = this.state.currentUser.name;
    const messageInput = {
      // id: oldMessages.length + 1,
      username: curUser,
      content: message
    }
    const newMessages = [...oldMessages, messageInput]
    this.setState({ messages: newMessages })
    this.socket.send(JSON.stringify(messageInput))
  }

  addUser = user => {
    this.setState({currentUser: {name: user}});
  }

  userOnChange = evt => {
    // console.log("useronchange", evt.target.value)
    this.setState({usernameValue: evt.target.value});
  }

  messageOnChange = evt => {
    // console.log("msg change", evt.target.value)
    this.setState({msgValue: evt.target.value});
  }

  
  submitMessage = evt => {
    if(evt.key == "Enter"){
      this.addMessage(this.state.msgValue, this.state.currentUser.name)
      evt.target.value = '';
    }
  }
  
  submitUser = evt => {
    if(evt.key == "Enter"){
      this.addUser(this.state.usernameValue)
    }
  }
  
  receiveMessage = (e) => {
    const msg = JSON.parse(e.data);
    const messages = this.state.messages.concat(msg)
    this.setState({messages})
  }

  

  render() {
    return (
      <div>
        <NavBar/>
        <MessageList messages = {this.state.messages}/>
        <ChatBar userOnChange = {this.userOnChange} messageOnChange = {this.messageOnChange} 
        submitMessage ={this.submitMessage} submitUser ={this.submitUser} currentUser ={this.state.currentUser.name}/>
      </div>
    )
  }
}
export default App;
