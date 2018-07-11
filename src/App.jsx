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
  
  addMessage = (message) => {
    const oldMessages = this.state.messages;
    const loggedInUser = this.state.currentUser.name;
    const messageInput = {
      // id: oldMessages.length + 1,
      username: loggedInUser,
      content: message
    }
    const newMessages = [...oldMessages, messageInput]
    this.setState({ messages: newMessages })
    this.socket.send(JSON.stringify(messageInput))
  }

  receiveMessage = (e) => {
    const msg = JSON.parse(e.data);
    console.log(msg)
    const messages = this.state.messages.concat(msg)
    this.setState({messages})
  }


  

  render() {
    return (
      <div>
        <NavBar/>
        <MessageList messages = {this.state.messages}/>
        <ChatBar addMessage ={this.addMessage} currentUser ={this.state.currentUser.name}/>
      </div>
    )
  }
}
export default App;
