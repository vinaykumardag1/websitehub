const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const User = mongoose.model("links", UserSchema);
module.exports = User;
