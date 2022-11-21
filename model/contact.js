const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    contact_no:{
        type:String,
        required:true
    }
    
});

module.exports = mongoose.model('Contact',userSchema);