const { User, Thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtID })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(dbThoughtData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtID }, req.body, {
      runValidators: true,
      new: true,
    })
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(dbThoughtData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtID })
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(dbThoughtData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(dbThoughtData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { $pull: { reactions: { reactionID: req.params.reactionID } } },
      { new: true }
    )
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No reaction with that ID" })
          : res.json(dbThoughtData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
