const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Trip',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    note: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model("WishList", wishListSchema)