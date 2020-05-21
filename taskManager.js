require('dotenv').config(); //Add .env 
const TelegramBot = require('node-telegram-bot-api'); //use telegram API
var http = require('http'); 

const token = process.env.TELEGRAM_TOKEN //Set Token
var chanel_id = process.env.CHANEL_ID ; 
const options = {
    webHook: {
      port: 80
    }
};
var bot = new TelegramBot(token , options); 

var taskManager = {
    task : {
    id : "",
    title: " ",
    description : "",
    linkInfo : "",
    status:"",
    freelancer:"",
    publisher:"",
    expireDate:"",
    point:"",
    image:""
    }, 
    SendToChannel:function(chanel_id , task , _id){
        var text = this.CreateTemplate(task);
        var option = this.createButton(task.linkInfo,_id)
        bot.sendMessage(chanel_id,text ,option); //SendMessage to Chanel
        console.log("send message!");   
    },
    CreateTemplate: function(task){
        var txt = task.title + "\n\n" + "توضیحات:"+ task.description + "\n\n" + "زمان تحویل:" + task.expireDate +
        "\n\n"+"امتیاز:" + task.point;
        return txt ; 
    },
    createButton(linkInfo,_id){
        //Create Button 
        var opts ={
            reply_markup: {
                inline_keyboard: [
                    [{text:"بیشتر" , url: linkInfo}, {text:"قبول", url: "https://t.me/yechizebahalbot?start="+_id}],
                    []              
                ]
            }         
        };
        return opts;
    }
}


module.exports = taskManager ; //Create Channel Manager Module