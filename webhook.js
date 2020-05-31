
var dataBaseManager = require('./DatabaseManager');
const TOKEN = process.env.TELEGRAM_TOKEN || '1174993784:AAF88wKCuFIsEi2ctayhbuwzKsED6AO_csI';
const url = 'https://6ac452d277b0.ngrok.io';
const port = 2020;

var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;//USE mongo liberary
var url_db = "mongodb://localhost:27017/"; //set database URL


const TelegramBot = require('node-telegram-bot-api'); //use telegram API
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);


// parse the updates to JSON
app.use(bodyParser.json());

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get('/tasks', function(req, res){
  //define a schema 
  taskSchema = mongoose.Schema({
    title : String,
    description :  String, 
    linkInfo : String,
    expireDate: String,
    point : Number
  }); 
  //assign a method on schema 
  taskSchema.statics.findBytitle = function(title){
    return this.find({title : title}); 
  }
  //convert to Model 
  taskModel = mongoose.model("task", taskSchema);
  var task =  taskModel.findBytitle("cscsc"); 
  res.send(task);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Bot server is listening on ${port}`);
});

// Just to ping!
bot.on('message', msg => {
  var chatId = msg.chat.id; //get chatId
  console.log(chatId);
  var text = msg.text; //get Message or Command
  console.log(text);
  if(text.startsWith("/start")){ //if start with /start it's command with task 
    var taskId = text.split(" ")[1]; //get the second part of this message beacuase has a task id.
    try{
      var task = get_by_id(taskId);
      console.log(task);
    }
    catch(err){
      bot.sendMessage(msg.chat.id, "you have a erro");
      console.log(err);
    }
    console.log(taskId);
    //pass taskId to get a task from db
  // var task = dataBaseManager.get_task_by_id(taskId);


function get_by_id(id, callback) {
  var ObjectId = require('mongodb').ObjectID; //create ObjectId

  MongoClient.connect(url_db, function(err , db){
    if(err) throw err;
    dbo = db.db("taskManager");
    var tasksCollection = dbo.collection("tasks");
    console.log("find by: "+ id);
    var x = get_collection(function(collection) {
      collection.findOne({"title":"cscsc"}, function(err, doc) {
         callback(doc);
      });
      console.log(x);
    db.close();
  });
  });
}
}
    //and add task to freelancer
  bot.sendMessage(msg.chat.id, 'I am alive!');
});
// var chanel_id = process.env.CHANEL_ID