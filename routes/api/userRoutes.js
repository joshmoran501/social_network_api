const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

router.route("/:userID").get(getSingleUser).put(updateUser).delete(deleteUser);

router.route("/:userID/friends/:friendID").post(addFriend).delete(deleteFriend);

module.exports = router;
