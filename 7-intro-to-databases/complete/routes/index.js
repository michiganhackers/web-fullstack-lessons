var express = require("express");
var router = express.Router();

// require user to be logged in before proceeding
const requireLogin = (req, res, next) => {
  if (req.cookies.username) {
    req.username = req.cookies.username;
    next();
  } else {
    res.status(403);
    res.send("Access denied, you are not logged in.");
  }
};

router.get("/notes", (req, res, next) => {
  const { db } = req.app.locals;
  db.all(
    `
	SELECT 
		notes.id, 
		notes.title, 
		notes.body, 
		notes.created, 
		notes.userid,
		users.username
	FROM 
		notes
	INNER JOIN users ON notes.userid = users.id;
	`,
    [],
    (err, rows) => {
      if (err) return console.error(err);
      res.render("notes", { notes: rows });
    }
  );
});

// List all notes from a user
router.get("/:username/notes", requireLogin, (req, res, next) => {
  const { db } = req.app.locals;
  const { username } = req.params;
  if (req.username !== username) {
    res.status(403);
    res.send(`Access denied, you are not logged in to user ${username}.`);
  }
  db.all(
    `
	SELECT 
		notes.id, 
		notes.title, 
		notes.body, 
		notes.created, 
		notes.userid,
		users.username
	FROM 
		notes 
	INNER JOIN 
		users ON notes.userid = users.id
	WHERE 
		users.username = ?`,
    [username],
    (err, rows) => {
      if (err) return console.error(err);
      if (rows) {
        res.render("notes", { notes: rows });
      } else res.render("notes", { notes: [] });
    }
  );
});

module.exports = router;
