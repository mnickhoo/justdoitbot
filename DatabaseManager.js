var taskManager = require('./taskManager');
//USE mongo liberary
var MongoClient = require('mongodb').MongoClient;
//set database URL
var url = "mongodb://localhost:27017/";

//Connect to database
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("taskManager");  // Connect to database
  var myobj = { name: "Company Inc", address: "Highway 37" }; //create an object
  //Select Collection to InsertInto
  dbo.collection("customers").insertOne(myobj, function(err, res) { 
    if (err) throw err;
    console.log("1 document inserted");
    db.close(); //Close database
  });
});

var databaseManager = {
  addTaskToDb :function(task , chanel_id){
    //Connect to database
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("taskManager");  // Connect to database
    //Select Collection to InsertInto
    dbo.collection("tasks").insertOne(task, function(err, res) { 
      if (err) throw err;
      console.log("1 document inserted " + res.insertedId);
      console.log("record contents",JSON.stringify(res,null,4));
    // Desired output
    // console.log("Id of new document added =  " + res.ops[0]._id);
      var _id = res.ops[0]._id ; 
      console.log("id is: "+_id);
      db.close(); //Close database
      taskManager.SendToChannel(chanel_id , task,_id); //send Task to Channel  

      return _id ; 
    });
  });
  }
}



module.exports = databaseManager ; //create database Manager Module