const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userID })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserdata) =>
        !dbUserdata
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(dbUserdata)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userID }, req.body, {
      runValidators: true,
      new: true,
    })
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(dbUserData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userID })
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $push: { friends: req.params.friendID } },
      { runValidators: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(dbUserData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $pull: { friends: req.params.friendID } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(dbUserData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
