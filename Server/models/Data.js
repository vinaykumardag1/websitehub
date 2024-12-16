const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
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

const Data = mongoose.model("links", dataSchema);
module.exports = Data;
