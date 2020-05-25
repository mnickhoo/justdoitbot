const TelegramBot = require('node-telegram-bot-api'); //use telegram API
const token = process.env.TELEGRAM_TOKEN //Set Token
var chanel_id = process.env.CHANEL_ID
const port = process.env.PORT || 3000; //port using for this thread

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