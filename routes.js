// const fs = require('fs');
// const path = require('path');

// module.exports = app => {

//     // Setup notes variable
//     fs.readFile("db/db.json","utf8", (err, data) => {

//         if (err) throw err;

//         var notes = JSON.parse(data);

//         // API ROUTES
//         // ========================================================
    
//         // Setup the /api/notes get route
//         app.get("/api/notes", function(req, res) {
//             // Read the db.json file and return all saved notes as JSON.
//             res.json(notes);
//         });

//         // Setup the /api/notes post route
//         app.post("/api/notes", function(req, res) {
//             // Receives a new note, adds it to db.json, then returns the new note
//             let newNote = req.body;
//             notes.push(newNote);
//             updateDb();
//             return console.log("Added new note: "+newNote.title);
//         });

//         // Retrieves a note with specific id
//         app.get("/api/notes/:id", function(req,res) {
//             // display json for the notes array indices of the provided id
//             res.json(notes[req.params.id]);
//         });

//         // Deletes a note with specific id
//         app.delete("/api/notes/:id", function(req, res) {
//             notes.splice(req.params.id, 1);
//             updateDb();
//             console.log("Deleted note with id "+req.params.id);
//         });

//         // VIEW ROUTES
//         // ========================================================

//         // Display notes.html when /notes is accessed
//         app.get('/notes', function(req,res) {
//             res.sendFile(path.join(__dirname, "../public/notes.html"));
//         });
        
//         // Display index.html when all other routes are accessed
//         app.get('/', function(req,res) {
//             res.sendFile(path.join(__dirname, "../public/index.html"));
//         });

//         //updates the json file whenever a note is added or deleted
//         function updateDb() {
//             fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
//                 if (err) throw err;
//                 return true;
//             });
//         }

//     });

// }

const fs = require("fs");
const path = require("path");


module.exports = (app) => {

    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    app.get("/api/notes", (req, res) => {
        return res.json(noteList);
    });

 
    app.post('/api/notes', (req, res) => {
       
        let lastId;
        if (noteList.length) {
            lastId = Math.max(...(noteList.map(note => note.id)));
     
        } else {
            lastId = 0;
        }

        const id = lastId + 1;

     
        noteList.push({ id, ...req.body });
       
        res.json(noteList.slice(-1));
       
        updateDb();
    });

  
    app.delete('/api/notes/:id', (req, res) => {
   
        let findNote = noteList.find(({ id }) => id === JSON.parse(req.params.id));

   
        noteList.splice(noteList.indexOf(findNote), 1);
        updateDb();
        res.end(`Note with id="${id}"was deleted`);
    });

    function updateDb() {
        fs.writeFile("db/db.json",JSON.stringify(noteList,'\t'),err => {
            if (err) throw err;
            return true;
        });
    }


    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });
      
  
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });
    
};