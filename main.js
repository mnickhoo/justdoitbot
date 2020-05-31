const {mongoose} = require('./db/mongoose'); 
const {freelancer} = require('./model/freelancer') ; 
const {project} = require('./model/project');
const {ObjectID} = require('mongodb');
let id = "5ed3bf5c70f9d157bc71cd13" ; //we know _id a document
let taskId = "5ed3cd021b0c864aec32e8fe" ; 
// freelancer.find({
//     _id : id
// }).then((freelancer) =>{
//     console.log("freelancer has been retrieved! " , freelancer) ; 
// }, (err) => {
//     Console.log("you have gotten an erro!!!" , err);
// })

// freelancer.findById(id).then((freelancer) => {
//     console.log("your freelancer is ready: ", freelancer) ; 
// })

/*
get project from id 
find freelancer adn assing project to them

*/
// let SelectProject = project.findById(taskId).then((project)=>{
//     console.log("project has been find!" , project) ; 
//     //find freelancer and assing project to freelancer
//     freelancer.findOneAndUpdate({
//         _id : id 
//         },{
//             $set : {
//                 chatId : "12334455" , 
//                 project : SelectProject
//             }
//         }).then(()=>{
//             console.log("freelancer has been updated!");
//         });
// }); ; 


// let newProject = new project({
//     title : "salam" , 
//     description : "sdcvmslvdsvmslv" , 
//     linkInfo : "https://nickhoo.ir"
// });

// newProject.save().then((project) => {
//     console.log("project has been added." , project) ; 
// })


// let newFreelancer = new freelancer({
//     name : 'mahdi' , 
//     family : 'nickhoo' ,
//     chatId : '3267688'
// })

/* Saved to db  */

// newFreelancer.save().then((freelancer) => {
//     console.log('freelancer has been saved.' , freelancer);
// } , (err)=> {
//     console.log("save freelancer has a problem. " , err)
// });


//remove from db 
//if object Id havent been on the database how to hadeling!!
let removeObjectId = "5ed3c0c4aeed481f1066072c" ;
if(!ObjectID.isValid(removeObjectId)){
    console.log("Object Id is not recognized!");
} else {
    freelancer.findByIdAndRemove({
        _id : removeObjectId
    }).then(() =>{
        console.log("freelancer deleted!");
    });
}
