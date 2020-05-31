var taskManager = require('./taskManager');
var MongoClient = require('mongodb').MongoClient;//USE mongo liberary
var url = "mongodb://localhost:27017/"; //set database URL
// MongoClient.connect(url, function(err, db) { //Connect to database
//   if (err) throw err;
//   var dbo = db.db("taskManager");  // Connect to database
// });

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
  },
  get_tasks : async function(){
    MongoClient.connect(url, function(err , db){
      if(err) throw err;
      dbo = db.db("taskManager");
      var tasks = dbo.collection("tasks").find({}).toArray(function(err,result){
        if(err) throw err ; 
        console.log(result);
        return result;
      }) 
      db.close();
    });
  }, 
  get_task_by_id(taskId){
    MongoClient.connect(url , function(err,db){
      if(err) throw err ; 
      var dbo = db.db("taskManager");
      var task = dbo.collection("tasks").find({ _id:{$in:[5,ObjectId(taskId)]}});
      return task;
    })
  }  
}


// var ObjectId = require('mongodb').ObjectID;

// var get_by_id = function(id, callback) {
//   console.log("find by: "+ id);
//   get_collection(function(collection) {
//     collection.findOne({"_id": new ObjectId(id)}, function(err, doc) {
//        callback(doc);
//     });
//   });
// }



module.exports = databaseManager ; //create database Manager Module