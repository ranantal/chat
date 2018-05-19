var WebSocketServer = new require('ws');
var MongoClient = require('mongodb').MongoClient;

var clients = {};
var messagesCollection;
var port = 1488;

MongoClient.connect('mongodb://127.0.0.1:27017/', function (err, db) {
	if (err) {throw err}
	
  messagesCollection = db.db('chat').collection('messages');
  messagesCollection.drop();
});

var webSocketServer = new WebSocketServer.Server({port: port});
console.log('Server starts on port: ' + port);
webSocketServer.on('connection', function(ws) {

  var id = Math.random();
  clients[id] = { socket: ws, name: null };
  console.log("New connection: " + id);

  ws.on('message', function(messageString) {
    let messageObj;
    
    // checking message format
    try {
      messageObj = JSON.parse(messageString);
      if (
        !messageObj.hasOwnProperty("type") || 
        !messageObj.hasOwnProperty("message") ||
        !messageObj.hasOwnProperty("name") ||
        !messageObj.hasOwnProperty("time")
      ) throw 0;
    } catch (err) {
      console.log('Get wrong message: ' + messageString);
      return;
    }
    
    console.log('New message from ' + id + ': ' + messageObj);
    // sending new message for all clients
    for(var key in clients) {
     // if (id !== key)
        clients[key].socket.send(messageString);
    }

    if (messageObj.type === 'CONNECT') { // registration
      clients[id].name = messageObj.name;
      // sending back all history
      messagesCollection.find().toArray(function(err, result) {
       // console.log(result);
        result.forEach(element => {
	 // delete element._id;
          ws.send(JSON.stringify(element));
        });
      });
    }

    // saving mew message in db
    messagesCollection.insertOne(messageObj);
  });

  ws.on('close', function() {
    console.log('Connection closed: ' + id);
    let name = clients[id].name;
    
    delete clients[id];

    let disconnectMessage = {
      type: 'DISCONNECT',
      name: name,
      message: null,
      time: (new Date()).getMilliseconds()
    };

    for (var key in clients) {
      clients[key].socket.send( JSON.stringify(disconnectMessage))
    }

    messagesCollection.insertOne(disconnectMessage);
  });

});