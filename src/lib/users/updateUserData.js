const Users = require("../../models/Users");

const updateUserData = async ({ user, uid }) => {
    const filter = { uid };
    const updatedUser = {
        $set: {
            ...user
        }
    }
    const cursor = await Users.updateOne(filter, updatedUser, { upsert: true });
    return cursor
}
module.exports = updateUserData