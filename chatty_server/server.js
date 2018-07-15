const express = require('express');
const WebSocket = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new WebSocket({
  server
});

const colorArr = ['#1c1f9c', '#acf27f', '#bf7530', '#af9cc2']



const messageHandlerBuilder = (color) => {

  return function (data) {
    const msg = JSON.parse(data);
    // handles based on the message type in the incoming message
    switch (msg.type) {
      case 'postMessage':
        msg.id = uuidv1();
        msg.type = 'incomingMessage';
        msg.color = color;
        sendMessageToClients(msg);
        break;
      case 'postNotification':
        msg.type = 'incomingNotification';
        sendMessageToClients(msg);
        break;
      default:
        throw new Error('Unknown event type ' + msg.type);
    }
  }
};

const getRandColor = () => {
  return colorArr[Math.floor(Math.random() * 3)]
}


const sendMessageToClients = msg => {
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(msg));
    }
  });
};

const updateUsersConnected = () => {
  let numUsers = wss.clients.size;
  const msg = {
    type: 'usersChanged',
    usersOnline: numUsers,
  };
  sendMessageToClients(msg);
};

// web socket server actions
wss.on('connection', ws => {
  let clientColor = getRandColor();
  updateUsersConnected();
  ws.on('message', messageHandlerBuilder(clientColor));
  ws.on('close', () => {
    updateUsersConnected();
  });
});
