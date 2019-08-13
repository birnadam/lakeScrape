// Export an object for MongoDB 
"use strict";

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/lakeScrape",
  Article: require("./Article"),
  Comment: require("./Comment"),
};