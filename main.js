const mongoose = require('./db/mongoose'); //we use mongoose CONFIGURATION
const TOKEN = process.env.TELEGRAM_TOKEN || '1174993784:AAF88wKCuFIsEi2ctayhbuwzKsED6AO_csI';
const url_local = 'https://6ac452d277b0.ngrok.io'; //for localhost
const port = 2020; //we use port on 2020 http://localhost://2020
const express = require('express'); //we use express module
const bodyParser = require('body-parser');
const {project} = require('./model/project');
var url = require('url'); //Url Module
var fs = require('fs'); // file System

const TelegramBot = require('node-telegram-bot-api'); //use telegram API

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(TOKEN);

// bot.setWebHook(`${url_local}/bot${TOKEN}`); //set webhook by address

// var dataBaseManager = require('./Junk/DatabaseManager'); //it's depricated 
// var MongoClient = require('mongodb').MongoClient;//USE mongo liberary
// var url_db = "mongodb://localhost:27017/"; //set database URL


// No need to pass any parameters as we will handle the updates with Express
// This informs the Telegram servers of the new webhook.
// parse the updates to JSON

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get('/insert', function(req , res){
    var q = url.parse(req.url, true); //get url 
    var filename = "./views/insert.html" //find fileName
    fs.readFile(filename,function(err, data) {
      if(err) {
        res.writeHead(404,{'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } //Error 404 not Found
      res.writeHead(200, {'Content-Type': 'text/html'});
      if(q.query.title != null){
        //initiate to project object

        let newProject = new project({
            title : q.query.title , 
            description : q.query.description, 
            linkInfo : q.query.linkInfo , 
            expireDate : q.query.expireDate, 
            point : q.query.point
        }); 
        //save to db 
        newProject.save().then((project)=>{
            console.log("project has been saved." , project); 
        },(err) =>{
            console.log("project unable to save on db", err);
        });
      }
      res.write(data); //return view
      return res.end();
    });
});

// Start Express Server
app.listen(port, () => {
  console.log(`Bot server's listening on ${port}`);
});

// Just to ping!
bot.on('message', msg => {
  var chatId = msg.chat.id; //get chatId
  var text = msg.text; //get Message or Command
  if(text.startsWith("/start")){ //if start with /start it's command with task 
    try{
    var taskId = text.split(" ")[1]; //get the second part of this message beacuase has a task id.
    //pass taskId to get a task from db
    let task = project.findById(taskId).then((task)=>{
        //and assing task to freelancer
        console.log("task is " , task);
        bot.sendMessage(`you select ${task.title}`);
    });
    }
    catch(err){
      bot.sendMessage(msg.chat.id, "you have an erro");
      console.log(err);
    }
}
  bot.sendMessage(msg.chat.id, 'I am alive!');
});

