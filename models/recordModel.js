const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordScehma = new mongoose.Schema({
    user_id: {type: Schema.Types.ObjectId, ref:'User'},
    recordTitle: {type: String},
    songTitle: {type: String},
    link: {type: String},
});

module.exports = mongoose.model("Records", recordScehma);