const mongoose = require("mongoose")

const tripSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User" ,
        required: true
    },
    title: {
        type:String,
        required: true
    },
    coverImage: {
        type:String,
        
    },
    startDate: {
        type:Date,
        
    },
    endDate: {
        type:Date,
    },
    summary: {
        type:String,
    },
}, {timestamps: true});

module.exports = mongoose.model("Trip", tripSchema); 