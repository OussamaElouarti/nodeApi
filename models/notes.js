const { timeStamp } = require('console');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserNotes = new Schema ({
    id: {
        type: String,
        required: true
    },
    text : {
        type : String,
        required : true
    },
    time : {
        type : Date,
        required : true
    }, 
    reminder : {
        type: Boolean,
        required : true
    }
});

const Notes = mongoose.model('UserNotes', UserNotes);
module.exports = Notes;