const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, lowercase: true },
    phone: { type: String, required: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: { type: Object, default: {
        code: 0,
        expiresIn: 0
    }},
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthDay: { type: String },
    Roles: { type: [String], default: ["USER"] }
});


module.exports = {
    UserModel: mongoose.model("user", Schema)
}