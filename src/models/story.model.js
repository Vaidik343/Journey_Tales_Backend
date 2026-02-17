const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    tripId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Trip",
        required: true
    },
    placeName: {
        type: String,
        required: true
    },
    images:[{
        type: String,
    }],
    story: {
        type: String,
    },
    visitDate: {
        type: Date
    }
}, {timestamps: true})

module.exports = mongoose.model("Stories", storySchema);
