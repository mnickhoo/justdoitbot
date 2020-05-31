const mongoose = require('mongoose');

let project = mongoose.model('project' , { 
    title : {
        type : String , 
        trim : true , 
        require : true
    } , 
    description: {
        type : String , 
        require : true 
    }, 
    linkInfo: {
        type : String 
    },
    status : {
        type : String
    },
    freelancerId : {
        type : Number
    }, 
    cowokerId : {
        type: Number
    },
    duration: {
        type : String
    },
    point : {
        type : Number
    }, 
    imageAddress : {
        type : String
    }
})


module.exports = {
    project 
}