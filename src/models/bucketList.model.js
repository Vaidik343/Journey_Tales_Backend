const mongoose = require("mongoose");

const bucketListSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Trip',
        required: true
    },
    name: {
        type: String,
         required: true
    },
    quantity:{
        type: Number
    },
    note: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model("bucketList", bucketListSchema)