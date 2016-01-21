/*
 * Song's Custom WebSocketServer
 * extends from the basic wss to allow custom listeners (i.e. commands)
 * and the transmission of JSON objects instead of just plaintext.
 */
var WebSocketServer = require('ws').Server;

//custom server object to keep track of clients
var CLIENTS = {};

//all html tags to be filtered
var invalid = ['script', 'img', 'body', 'iframe', 'input', 'link', 'table', 'div', 'object'];

//xss filtering function
var isValid = function(text) {
  if (text === undefined) {
    return false;
  }

  for (var i = 0; i < invalid.length; i++) {
    var regexp = new RegExp('<.*?' + invalid[i] + '.*?>');
    if (regexp.test(text)) {
      return false;
    }
  }
  return true;
};


module.exports = function(server) {
  var wss = new WebSocketServer({
    server: server
  });

  //sends data to each connected websocket client
  console.log('ws: server started.')
  wss.broadcast = function(data) {
    wss.clients.forEach(function(client) {
      client.send(data);
    })
  };

  //prevents timeout of clients by constantly sending a ping every second
  setInterval(function() {
    wss.broadcast('ping');
  }, 1000);

  //commands object that manages all explicit server-side socket functionalities
  var commands = {

    //sends a message to all connected clients
    message: function(data) {
      //noob catching function
      if (!isValid(data.text)) {
        data.text = "I tried to send an XSS attack and failed :(";
      }
      wss.broadcast(JSON.stringify({
        username: data.username,
        userid: data.userid,
        text: data.text,
        p: false
      }));
    },

    //registers the websocket with it's associated username for easy lookup/differentiation
    register: function(data, ws) {
      CLIENTS[data.userid] = ws;
      ws.USERNAME = data.username;
      ws.USERID = data.userid;
      wss.broadcast(JSON.stringify({
        username: 'SYSTEM',
        text: ws.USERNAME + ' has joined SOng-CKET.io.',
        noreply: true
      }))
      wss.broadcast('update');
    },

    //sends a message to ONLY a user, way more secure than broadcasting a message with specific user parameters
    privateMessage: function(data) {
      if (CLIENTS[data.to] !== undefined) {
        if (!isValid(data.text))
          data.text = "I hate you and tried to send an XSS attack... but failed";
        //send a message to the target client, with a private flag
        CLIENTS[data.to].send(JSON.stringify({
          username: data.username,
          userid: data.userid,
          text: data.text,
          private: 'From'
        }));
        //also send a copy of the private message to the source client
        CLIENTS[data.userid].send(JSON.stringify({
          username: CLIENTS[data.to].USERNAME,
          text: data.text,
          userid: data.userid,
          private: 'To'
        }));
      } else {
        //invalid target client
        CLIENTS[data.userid].send(JSON.stringify({
          username: 'SYSTEM',
          text: 'The user you are trying to reach does not exist or is not connected.',
          noreply: true
        }))
      }
    }
  }

  wss.on('connection', function(ws) {

    ws.on('close', function() {
      delete CLIENTS[ws.USERID]; //when a websocket client is dropped, delete the reference from CLIENTS array
      wss.broadcast(JSON.stringify({
        username: 'SYSTEM',
        text: ws.USERNAME + ' has left SOng-CKET.io.',
        noreply: true
      }))
      wss.broadcast('update');
    });

    ws.on('message', function(data) {
      //takes in data as a stringified JSON object, with a 'command' property
      var dataObj = JSON.parse(data);
      //executes the command if it exists in the above commands object
      if (dataObj.command in commands)
        commands[dataObj.command](dataObj.data, ws);
    });

  })
};

module.exports.getClients = function() {
  var result = [];
  for (client in CLIENTS) {
    result.push({
      username: CLIENTS[client].USERNAME,
      userid: CLIENTS[client].USERID
    });
  }
  return result;
}
