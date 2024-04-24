const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const signin = new Schema(
    {
        name: { type: String, maxLength: 255,minLength: 10, require :true },
        email: { type: String, maxLength: 255,require :true },
        password: { type: String, maxLength: 255,minLength: 10,require :true },
        createdate: { type: Date, default: Date.now }
    }
);
module.exports = mongoose.model('Sign', signin);
