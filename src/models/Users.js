const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
    displayName: String,
    email: String,
    uid: String,
    name: String,
    address: String,
    bio: String,
    city: String,
    landmark: String,
    userName: String,
    website: String,
    zip: String,
    cart: [{ productId: Number, quantity: Number }]
})

const Users = model("User", UserSchema);

module.exports = Users;