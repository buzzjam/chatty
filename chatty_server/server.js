const express = require('express');
const WebSocket = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket({
  server
});

const sendMessageToClients = (msg) => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      console.log("message out:", JSON.stringify(msg))
      client.send(JSON.stringify(msg));
    }
  });
}

wss.on('connection', (ws) => {
  console.log("Client connected")

  ws.on('message', (data) => {
    const msg = JSON.parse(data)
    console.log("incoming data:", JSON.parse(data))
    switch(msg.type) {
      case "postMessage":
        msg.id = uuidv1();
        msg.type = "incomingMessage";
        sendMessageToClients(msg)
        break;
      case "postNotification":
        msg.type = "incomingNotification";
        sendMessageToClients(msg)
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + msg.type);
    }
  });
  
  ws.on('close', () => console.log('Client disconnected'));
});

