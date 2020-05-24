const TelegramBot = require('node-telegram-bot-api'); //use telegram API
const token = '1174993784:AAF88wKCuFIsEi2ctayhbuwzKsED6AO_csI'; //Set Token
var MongoClient = require('mongodb').MongoClient; //USE mongo liberary
var url = "mongodb://localhost:27017/"; //set database URL
// for listening to port 80 on ngrok
const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const port = 8065; //set port 80

const bot = new TelegramBot(token, {polling:true});
    
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
//
  //send test message to Channel
  if(msg.text.toString().toLowerCase().indexOf("/send") === 0){
      //chanell Id 
      var chanel_id = -110829829
      bot.sendMessage(chanel_id , "salam");
  }

//Connect to database
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("doit");  // Connect to database
  //Select Collection to InsertInto
  dbo.collection("chats").insertOne(msg, function(err, res) { 
    if (err) throw err;
    console.log("1 document inserted");
    db.close(); //Close database
  });
}); 
});

app.listen(port, () => { //listener to port 80 
    console.log(`Listening on port ${port}`);
});