<<<<<<< HEAD
var http = require('http');
var database = require('./DatabaseManager');
var express = require('express'); 
app = express();

app.get("/", function(err,res){
    var tasks = database.get_tasks();
    res.send("hello")
    console.log(tasks);
    // res.send(tasks);
});


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })
=======
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
>>>>>>> 6b551a2c6605fd83be673a766888a807e8a4c337
