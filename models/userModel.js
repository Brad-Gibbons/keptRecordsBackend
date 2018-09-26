const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleID: String,
    records: [{type: Schema.Types.ObjectId, ref:'Records' }]
});

const User = mongoose.model('user', userSchema);

module.exports = User;