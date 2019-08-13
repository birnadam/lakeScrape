// Scheme for comments
"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: String,
    body: String,

    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;