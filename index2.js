<<<<<<< HEAD
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
=======
// Dependencies
const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 20005;
//Telegram
const TelegramBot = require('node-telegram-bot-api'); 
const token = '1174993784:AAF88wKCuFIsEi2ctayhbuwzKsED6AO_csI'; //Set Token here
const bot = new TelegramBot(token);


bot.on('message', (msg) => {
    console.log(msg);
    //greeting
    if (msg.text.toString().toLowerCase().indexOf("hi") === 0) {
    bot.sendMessage(msg.chat.id,"Hello dear user");
    } 
    if(msg.text.toString().toLowerCase().indexOf("bye") === 0){
        bot.sendMessage(msg.chat.id, "bye bye jojo");
    } 
    if(msg.text.toString().toLowerCase().indexOf("owner") === 0){
        bot.sendMessage(msg.chat.id, "now my father is Mehdi :*");
    }  
    //send test message to Channel
    if(msg.text.toString().toLowerCase().indexOf("/send") === 0){
        //chanell Id 
        var chanel_id = -110829829
        bot.sendMessage(chanel_id , "salam");
    }

    //USE mongo liberary
    var MongoClient = require('mongodb').MongoClient;
    //set database URL
    var url = "mongodb://localhost:27017/";

    //Connect to database
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");  // Connect to database
    //Select Collection to InsertInto
    dbo.collection("customers").insertOne(msg, function(err, res) { 
        if (err) throw err;
        console.log("1 document inserted");
        db.close(); //Close database
    });
    });
    //* End Connection

  });


// Configurations
// app.use(bodyParser.json());

// Endpoints




// Listening


app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});
>>>>>>> 6b551a2c6605fd83be673a766888a807e8a4c337
