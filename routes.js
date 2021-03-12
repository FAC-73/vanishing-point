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
