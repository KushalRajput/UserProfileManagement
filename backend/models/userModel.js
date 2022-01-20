const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    country_code: {
        type: String,
    },
    mobile_number: {
        type: String,
    },
    email: {
        type: String,
        required: "email is required",
    },
    admin: {
        type : Number,
        default : 0
    },
    gender: {
        type: String,
    },
    about: {
        type: String,
    },
    strengths : [{
        type: Object,
    }],
    password: {
        type: String,
    },
    access_token: {
        type: String,
    },

}, {
    versionKey: false,
    collection: 'users',
    timestamps: true
});

exports.UserModel = mongoose.model('users', userSchema);
