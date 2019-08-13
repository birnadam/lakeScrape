// Schema for articles
"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({

    // headline is required and of type String
    headline: {
        type: String,
        required: true
    },

    // headline isn't required and of type String
    summary: {
        type: String,
        required: false
    },

    // link is a unique index and of type String
    link: {
        type: String,
        index: true,
        unique: true,
    },

    // imageURL is a link to an image if available
    imageURL: {
        type: String,
        required: false,
        default: null,
    },

    // comment is an object that stores a comment id
    // The ref property links the ObjectId to the Comment model
    // This allows us to populate the Article with an associated Comment
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;