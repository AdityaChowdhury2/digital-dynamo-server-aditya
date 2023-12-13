const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
    displayName: String,
    email: String,
    uid: String,
    cart: [{ productId: Number, quantity: Number }]
})

const Users = model("User", UserSchema);

module.exports = Users;