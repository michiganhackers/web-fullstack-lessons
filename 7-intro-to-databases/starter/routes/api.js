var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');

// Done for you: 
// Function to require user to be logged in before proceeding.
// Once you have implemented authentication, uncomment the
// requireLogin line on the routes using it.
const requireLogin = (req, res, next) => {
	if (req.cookies.username) {
		req.username = req.cookies.username;
		next();
	}
	else {
		res.status(403);
		res.send("Access denied, you are not logged in.");
	}
}

// TODO: List all existing notes (as json)
// Hint: use the code in index.js, except return a json instead of html
router.get("/notes", (req, res, next) => {
	const { db } = req.app.locals;
	res.json({msg: "Implement this route!"});
});

// TODO: create a note with the specified title and body
// You can just hardcode a userid in the SQL statement
// if you haven't implemented the authentication yet
router.post("/notes", 
			// requireLogin,
			(req, res, next) => {
	const { db } = req.app.locals;
	const { title, body } = req.body;
	res.json({msg: "Implement this route!"});
})

// TODO: delete a note at the specified id
// Then, after implementing authentication, make sure
// the logged in username matches the userid of the note
router.delete("/notes/:id", 
			//   requireLogin, 
			  (req, res, next) => {
	const { db } = req.app.locals;
	const { id } = req.params;
	res.json({msg: "Implement this route!"});
})

// TODO: modify a note at the specified id to have the
// specified title and body.
// Then, after implementing authentication, make sure
// the logged in username matches the userid of the note
router.put("/notes/:id", 
			// requireLogin, 
			(req, res, next) => {
	const { db } = req.app.locals;
	const { id } = req.params;
	const { title, body } = req.body;
	res.json({msg: "Implement this route!"});
})

// TODO: Autheticate the user (verify that their username/password
// combination is valid, then set that username as a cookie)
// Hint: use res.cookie to set the username as a cookie,
// and use bcrypt.compareSync to verify that the entered password
// matches the stored hashed one
router.post("/login", (req, res, next) => {
	const { db } = req.app.locals;
	const { username, password } = req.body;
	res.json({msg: "Implement this route!"});
})

// TODO: List all notes from a user (as json)
// Thus should be done after implementing authentication
router.get("/:username/notes", requireLogin, (req, res, next) => {
	const { db } = req.app.locals;
	const { username } = req.params;
	res.json({msg: "Implement this route!"});
})


module.exports = router;
