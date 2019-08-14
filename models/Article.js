// Schema for articles
"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: false
    },

    link: {
        type: String,
        index: true,
        unique: true,
    },

    imageURL: {
        type: String,
        required: false,
        default: null,
    },

    // Time whne article is inserted
    createdAt: {
        type: Date,
        default: Date.now
    },

    // Array of comment IDs
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
