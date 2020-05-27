//Declaration
var http = require('http'); //http Module
var url = require('url'); //Url Module
var fs = require('fs'); // file System
var taskManager = require('./taskManager.js'); //Local Module
var databaseManager = require('./DatabaseManager'); //Local Module
var chanel_id = process.env.CHANEL_ID; //set Channel Id
<<<<<<< HEAD
var port = process.env.PORT || 3000; 
=======
var port = 8888; 
>>>>>>> 6b551a2c6605fd83be673a766888a807e8a4c337
//Create Server on port
http.createServer(async function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename,function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } //Error 404 not Found
    res.writeHead(200, {'Content-Type': 'text/html'});
    if(q.query.title != null){
      //initiate to task object
      taskManager.task = {
        title : q.query.title,
        description : q.query.description,
        linkInfo : q.query.linkInfo,
        expireDate : q.query.expireDate,
        point : q.query.point
      }
      //add task to database and return inserted id in collection
       databaseManager.addTaskToDb(taskManager.task , chanel_id); 
    }
    res.write(data);
    return res.end();
  });
}).listen(port);

console.log('server is running!');
