const updateUserData = require("../../../../lib/users/updateUserData");

const userUpdateController = async (req, res, next) => {
    try {
        const uid = req.params.uid;
        const user = req.body;
        const result = await updateUserData({ uid, user });
        res.send(result);

    } catch (error) {
        next(error);
    }
}

module.exports = userUpdateController;