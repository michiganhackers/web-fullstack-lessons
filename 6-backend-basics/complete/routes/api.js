var express = require("express");
var router = express.Router();

// List existing notes
router.get("/", function (req, res, next) {
  const { notes } = req.app.locals;
  res.json({ notes });
});

// Add a new note
router.post("/", function (req, res, next) {
  const { notes } = req.app.locals;
  const { title, body } = req.body;
  const new_id = req.app.locals.next_id;
  ++req.app.locals.next_id;
  notes.push({ id: new_id, title, body });
  res.json({ id: new_id });
});

// Delete a note by id
router.delete("/:id", function (req, res, next) {
  const { notes } = req.app.locals;
  const { id } = req.params;
  const id_num = Number(id);
  if (isNaN(id_num)) {
    res.status(400);
    res.json({ error: "Invalid Note Id" });
  }
  const index = notes.findIndex((note, i) => note.id === id_num);
  if (index !== -1) {
    notes.splice(index, 1);
    res.json({ note_count: notes.length });
  } else {
    res.status(404);
    res.json({ error: "Unknown Note Id" });
  }
});

// Update a note by id
router.put("/:id", function (req, res, next) {
  const { notes } = req.app.locals;
  const { id } = req.params;
  const id_num = Number(id);
  const { title, body } = req.body;

  if (isNaN(id_num)) {
    res.status(400);
    res.json({ error: "Invalid Note Id" });
  }
  const index = notes.findIndex((note, i) => note.id === id_num);
  if (index !== -1) {
    notes[index] = { ...notes[index], title, body };
    res.json({ note: notes[index] });
  } else {
    res.status(404);
    res.json({ error: "Unknown Note Id" });
  }
});

// Search notes for certain text
router.get("/search", function (req, res, next) {
  const { notes } = req.app.locals;
  let { q: query } = req.query;

  if (!query) {
    query = req.cookies.last_search
  }

  if (!query) {
    res.json([]);
  }
  res.cookie("last_search", query)

  const search_regex = new RegExp(query, "g");
  res.json(
    notes
      .filter((note) => note.title.search(search_regex) !== -1)
      .map((note) => note.id)
  );
});


module.exports = router;
