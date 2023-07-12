const mongoose = require('mongoose');

const { Schema } = mongoose;

const LoginSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
})

module.exports = mongoose.models.Login || mongoose.model("Login", LoginSchema);