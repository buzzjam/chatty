Chatty App
=====================

A chat app similar to Slack. Built using React, Websocket (Express server). The chat updates in real time for each connected user.
### Usage

1. Clone the repo to your local drive.
2. Open up two terminals, and change the directory to "/chatty/", and "/chatty_server/".
3. Run npm install in both terminals.
4. Run npm start and open http://localhost:3000 .

### Screenshots

!["Chatty App"](https://i.imgur.com/NDUZ03k.png)

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.


### Dependencies

* React
* Websocket
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
