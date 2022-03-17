var express = require("express");
var router = express.Router();

// Done for you: require user to be logged in before proceeding
const requireLogin = (req, res, next) => {
  if (req.cookies.username) {
    req.username = req.cookies.username;
    next();
  } else {
    res.status(403);
    res.send("Access denied, you are not logged in.");
  }
};

// Done for you: get all notes (as html)
router.get("/notes", (req, res, next) => {
  const { db } = req.app.locals;
  db.all(
    `
	SELECT 
		id, 
		title, 
		body, 
		created, 
		userid
	FROM 
		notes
	`,
    [],
    (err, rows) => {
      if (err) return console.error(err);
      res.render("notes", { notes: rows });
    }
  );
});

// TODO: List all notes from a user (as html)
router.get("/:username/notes", requireLogin, (req, res, next) => {
  const { username } = req.params;
  res.json({ msg: "Implement this route!" });
});

module.exports = router;
