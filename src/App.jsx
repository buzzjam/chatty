import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    };
    this.addMessage = this.addMessage.bind(this);
  }
  
  addMessage (message) {
    const oldMessages = this.state.messages;
    const loggedInUser = this.state.currentUser.name;
    const messageInput = {
      id: oldMessages.length + 1,
      username: loggedInUser,
      content: message
    }
    const newMessages = [...oldMessages, messageInput]
    this.setState({ messages: newMessages })
  }

  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 1000);
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
