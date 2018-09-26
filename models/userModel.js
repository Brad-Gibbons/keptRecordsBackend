const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    googleID: String,
    records: [{type: Schema.Types.ObjectId, ref:'Record' }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;