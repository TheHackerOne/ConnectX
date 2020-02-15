const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    user_year: {
        type: String,
        required: true
    },
    // user_skills: [{
    //     skill_name:{
    //         type: String,
    //         required: true
    //     },
    //     skill_level:{
    //         type: String,
    //         required: true
    //     }
    // }],
    // user_friends: [{
    //     user_friendName: {
    //         type: String,
    //         required: true  //this user_friends block need to be changed after some research
    //     },
    //     user_friendImg: {
    //         user_friendImg: String,
    //         required: true
    //     }
    // }]
});

module.exports = mongoose.model('user',userSchema);