var db= require('./DatabaseManager');
var express = require('express'); 
var MongoClient = require('mongodb').MongoClient;
//set database URL
var url = "mongodb://localhost:27017/";
var app = express(); 


app.get("/view" , function(req,res){
    MongoClient.connect(url, function(err , db){
        if(err) throw err;
        dbo = db.db("taskManager");
        var tasks = dbo.collection("tasks").find({}).toArray(function(err,result){
          if(err) throw err ; 
          console.log(result);
          res.json(result);
        }) 
        db.close();

   res.json(tasks);
})
})

var sever = app.listen(process.env.port , function(err , res){
    console.log("server is running....!")
})