const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new mongoose.Schema({
    user_id: {type: Schema.Types.ObjectId, ref:'User'},
    artistTitle: {type: String},
    songTitle: {type: String},
    link: {type: String},
});

module.exports = mongoose.model("Record", recordSchema);