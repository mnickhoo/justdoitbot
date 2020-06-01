const mongoose = require('../db/mongoose');
const {freelancerModel} = require('../model/freelancerModel');

var freelancerService = {
    isRegistered : function(chatId){
        let isIt = false ; 
        let freelancer = this.findFreelancer(chatId) ; 
        return freelancer !== null ; 
    }, 
    registerFreelancer : function(freelancer){
        let newFreelancer = new freelancerModel({
            name : freelancer.name , 
            family : freelancer.family , 
            chatId : freelancer.chatId , 
            sheba  : null , 
            skills : null , 
            project : null , 
            isMojaz : true
        });
        newFreelancer.save().then((freelancer) => {
            return true ; 
        } , (err) => {
            throw err ; 
        });
    } , 
    findFreelancer : function(chatId){
       let freelancer = freelancerModel.find({
            chatId : chatId
        }).then((freelancer) => {
            console.log("freelancer is found" , freelancer);
        })
        return freelancer;
    }, 
    findAndAssingProject : function(chatId , project){
        freelancerModel.find({
            chatId : chatId
        }).then((freelancer) => {
            freelancer.project = project ; 
            freelancer.save().then(() =>{
                console.log("saved!!!");
            })
            console.log(freelancer); 

        })
    }
}


module.exports = freelancerService ; 