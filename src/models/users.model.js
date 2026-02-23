const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        index: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    password: {
        type: String,
            required: true
    },
    profile: {
        type: String
    },
    refreshToken: {
        type: String
    }

},  { timestamps: true })

module.exports = mongoose.model("User", userSchema)
