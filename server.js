const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require("mongoose");

// Load mongoose database models
const db = require("./app/models");

// Port number for server
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Register Handlebars 
app.engine('handlebars', exphbs({defaultLayout: 'main', extname: 'handlebars'}));
app.set('view engine', 'handlebars');

// Parse as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Use public folder statically 
app.use(express.static("public"));

// Set up middleware
app.use("/", index);
app.use("/api/scrape", scrape);
app.use("/api/articles", articles);

// Connect to Mongo DB
mongoose.connect(db.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => console.log(`Connected to MongoDB ${db.MONGODB_URI}`))
  .catch(err => console.log(err));

// Start the server
app.listen(PORT, () => {
  console.log('App is running @ → PORT ' + PORT);
});