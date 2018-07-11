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

// Set up a callback that will run when a client connects to the server 
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.


wss.on('connection', (ws) => {
  console.log("Client connected")
  ws.on('message', (data) => {
    const msg = JSON.parse(data)
    msg.id = uuidv1()
    console.log(msg);
    // Broadcast to everyone else.
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === 1) {
        client.send(JSON.stringify(msg));
      }
    });
  });
  ws.on('close', () => console.log('Client disconnected'));
});