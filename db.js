require('dotenv').config()
const mongoose = require('mongoose');
const { MAX_USERNAME_LENGTH, MAX_DESCRIPTION_LENGTH, MIN_DURATION } = require('./validation');
const uri = process.env.MONGO_URI;

try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
    console.log(error);
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: MAX_USERNAME_LENGTH
    }
});

const exerciseSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: MAX_USERNAME_LENGTH
    },
    description: {
        type: String,
        required: true,
        maxLength: MAX_DESCRIPTION_LENGTH
    },
    duration: {
        type: Number,
        required: true,
        min: MIN_DURATION
    },
    date: {
        type: Date,
        default: new Date().toUTCString()
    }
});

const User = mongoose.model("User", userSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);

exports.mongoose = mongoose;
exports.User = User;
exports.Exercise = Exercise;