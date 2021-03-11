//dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");

// Sets up the Express App
const app = express();
// Sets port for listening and let heroku decide on port, if not, use port 8080
const PORT = process.env.PORT || 3000;

//serve images, CSS files, and JavaScript files in a directory named public
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// include routes
require('./routes')(app);

//listen tot he port when deployed
app.listen(PORT, () => console.log("Server listening on port " + PORT));