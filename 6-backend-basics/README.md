# Notes Backend

Your goal is to use the code provided in [`starter`](starter) to create a REST api that stores notes and lets users search them.
Some code is provided for you to make certain sections easier and to give you an idea of what
to add.

### Required Features

#### Checkpoint 1

* Does the `GET /notes` route show an HTML page with all of the notes?
* Does the `GET /api/notes` route show a JSON with all of the notes?

#### Checkpoint 2

* Does the `POST /api/notes` route add a new note and return the new id?
* Does the `DELETE /api/notes/:id` route delete a note, returning the number of remaining notes or an error message if it cannot?
* Does the `PUT /api/notes/:id` route change a note, returning the new note or an error message if it cannot?


#### Checkpoint 3

* Does the `GET /api/notes/search?q=text` route search for notes containing the given text and return their ids?
* Does the `GET /api/notes/search` return the results of the previous search the user did?
