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