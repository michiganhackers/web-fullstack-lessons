var express = require("express");
var router = express.Router();

// List existing notes
router.get("/", function (req, res, next) {
  // TODO: display the notes saved in process memory

});

// Add a new note
router.post("/", function (req, res, next) {
  // TODO: add a new note to the notes variable and return its id
  res.json({error: "Not Implemented"})
});

// Delete a note by id
router.delete("/:id", function (req, res, next) {
  // TODO: remove the note given by the id if possible
  res.json({ error: "Not Implemented" });
});

// Update a note by id
router.put("/:id", function (req, res, next) {
  // TODO: change the contents of the note with the id
  res.json({ error: "Not Implemented" });
});

// Search notes for certain text
router.get("/search", function (req, res, next) {
  // TODO: if there is a valid query parameter `q`, then search all notes for that text, otherwise, search for the previous value
  //    Return an empty array if there is no previous search with an empty query or no notes found
  res.json({ error: "Not Implemented" });
});


module.exports = router;
