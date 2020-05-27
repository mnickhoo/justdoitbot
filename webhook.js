<<<<<<< HEAD
/**
 * This example demonstrates setting up a webook, and receiving
 * updates in your express app
 */
/* eslint-disable no-console */

const TOKEN = process.env.TELEGRAM_TOKEN || '1174993784:AAF88wKCuFIsEi2ctayhbuwzKsED6AO_csI';
const url = 'https://b2673167.ngrok.io';
const port = 2020;

const TelegramBot = require('node-telegram-bot-api'); //use telegram API
const express = require('express');
const bodyParser = require('body-parser');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(bodyParser.json());

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
//ssss
// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});
//add comment
// Just to ping!
bot.on('message', msg => {
  bot.sendMessage(msg.chat.id, 'I am alive!');
});
=======
const TelegramBot = require('node-telegram-bot-api'); //use telegram API
const token = process.env.TELEGRAM_TOKEN //Set Token
var chanel_id = process.env.CHANEL_ID
const port = process.env.PORT; //port using for this thread

///Express
var express = require('express');
var app = express();
app.use(express.json()); //Convert to Json Object
////#endregion

const options = {
    webHook: {
      port: port
    }
};

var bot = new TelegramBot(token ); 

bot.on('message', function onMessage(msg) {
  bot.sendMessage(msg.chat.id, 'I am alive on Heroku! how are you?');
});



//Listen on port 8085 by post request
app.post('/', function(request, response){
  var chatId = request.body.message.chat.id; //get chatId
  var text = request.body.message.text; //get Message or Command
  if(text.startsWith("/start")){ //if start with /start it's command with task 
    let taskId = text.split(" ")[1]; //get the second part of this message beacuase has a task id.
    //find task in the database
    //**I Will Write this section as soon as soon */  

    //show to user Task


    bot.sendMessage(chatId,"task is: "+taskId);
  }else{
    bot.sendMessage(chatId,"SSS");
  }
});
app.listen(port);
>>>>>>> 6b551a2c6605fd83be673a766888a807e8a4c337
