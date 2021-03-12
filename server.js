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