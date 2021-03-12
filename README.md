# vanishing-point
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<br />

A simple note taking application allows you to create, save, edit and delete notes. This node application is built with ExpressJS and deployed on Heroku.


## Table of Contents
- [View project](https://pure-stream-99195.herokuapp.com/)
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

![Note taker app with express.js](https://github.com/FAC-73/vanishing-point/blob/main/Assets/Demo.png?raw=true)
<br />

## User Story

```
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
```

## Acceptance Criteria

```md
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
```

## Description

A node.js application that allows a user to create, save, edit, and delete notes. A user can include both a title for each note, and note text. 

This application uses [Express.js ](https://github.com/FAC-73/dream-attack/blob/master/export/README.md). Express.js is used for server initialization and setup as shown in the code snippet below:

```md
// Dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");

// Includes the Express App
const app = express();

// Port for listening, and variable allowing heroku to decide port on port, if not, use port 3000
const PORT = process.env.PORT || 3000;

// Use images, CSS files, and JavaScript files located in directory called 'public'
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// include routes
require('./routes')(app);

//listen to port when deployed, console.log to validate success
app.listen(PORT, () => console.log("You are listening to Notes app on port " + PORT));
```

Routes are stored in a separate file. This app also leverages express for setting up routing, as well as a JSON file for CRUD interactions as shown in the code snippet below:

```md
// dependencies
const fs = require('fs');
const path = require('path');

module.exports = app => {

//route to notes.html document
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//route to read the `db.json` file and return saved notes as JSON.
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

//route to index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//receive a new note add to the `db.json` file, then return the new note to application
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let notelength = (noteList.length).toString();

    //create new property called id using length property, assign to the json object
    newNote.id = notelength;
    //push updated note to data in db.json
    noteList.push(newNote);

    //write to data to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
})

//delete note based on id
app.delete("/api/notes/:id", (req, res) => {
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = (req.params.id).toString();

    // filter notes with a matching id, save as new array
    // matching array is deleted
    noteList = noteList.filter(selected =>{
        return selected.id != noteId;
    })

    //write the updated data to db.json and display updated note
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

}
```

## Installation
Clone the repo to your local development environment.

```md
git clone https://github.com/FAC-73/vanishing-point.git
```
Navigate to the vanishing-point folder directory using the command prompt.

Run `npm install` to install all dependencies. To use the application locally, run `node server.js` in terminal or bash, and then open http://localhost:3000 [or whatever terminal port you have specified] in your preferred browser. 

## Usage
Launch the [app ](https://pure-stream-99195.herokuapp.com/)

![Note taker app with express.js](https://github.com/FAC-73/vanishing-point/blob/main/Assets/Screenshot-of-app.png?raw=true)
<br />
1. Click the `get started` button to navigate to the `/notes' route
<br />

![Create note](https://github.com/FAC-73/vanishing-point/blob/main/Assets/Create-new.png?raw=true)
<br />
2. In the notes page add text into the *Note title* and *Note text* fields
<br />

![Save note](https://github.com/FAC-73/vanishing-point/blob/main/Assets/Save-note.png?raw=true)
<br />

3. Once both inputs have been filled out a *save button* should appear in the top right corner
4. Click save to save the note
5. The saved note is appended to the list on the left
<br />

![Edit note](https://github.com/FAC-73/vanishing-point/blob/main/Assets/Edit-item.png?raw=true)
<br />

6. To edit a note click on any of the items in the list and edit the input text, click save to save changes
<br />

![Delete note](https://github.com/FAC-73/vanishing-point/blob/main/Assets/Delete-item.png?raw=true)
<br />

7. To delete, use the delete button on each list item.


## Licence
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<br />

## Contributing
[Kay Davis](https://github.com/FAC-73)
<br />

## Built with
- [Javascript](https://www.w3schools.com/jsref/default.asp)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [JSON](https://www.json.org/json-en.html)

## Questions?

### GitHub Username:
[FAC-73](https://github.com/FAC-73)

###  ✉️ Email me:
[kaydavis21@googlemail.com](mailto:kaydavis21@googlemail.com)

### 📁 GitHub project repo:
[https://github.com/FAC-73/vanishing-point](https://github.com/FAC-73/vanishing-point)

### 🔗 Deployed application:
[https://github.com/FAC-73/vanishing-point](https://github.com/FAC-73/vanishing-point)
