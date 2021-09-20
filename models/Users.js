const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Notes = require('./notes');

const UsersSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true
    },
    notes: [{
        type: Object
    }]
}, { timestamps: true });
UsersSchema.notes = new Notes();

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;