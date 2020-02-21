const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
})

module.exports = mongoose.model('profile', profileSchema);