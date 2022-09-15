const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtID")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtID/reactions").post(addReaction);

router.route("/:thoughtID/reactions/:reactionID").delete(deleteReaction);

module.exports = router;
