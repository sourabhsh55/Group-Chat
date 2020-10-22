const mongoose = require('mongoose');


const Msg = mongoose.model('Msg',new mongoose.Schema({
    count:{
        type: Number,
        required:true,
        unique:true
    },
    username: {
        type: String,
        required: true,
        unique: false
    },
    message: {
        type: String,
        required: true,
        unique:false
    }
}))

exports.Msg = Msg;