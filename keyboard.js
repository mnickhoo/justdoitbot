//Declares
var http = require('http');
var url = require('url');
var taskManager = require('./taskManager');
var chanel_id = -110829829; //set Channel Id
var port = 666; 
//Create Server on port
http.createServer(function (req, res) {
  
 taskManager.sendTest();
    


}).listen(port);

console.log('server is running!');
