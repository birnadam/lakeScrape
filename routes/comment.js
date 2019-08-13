"use strict";

//Route for comment page
const express = require("express");
const router = express.Router();
const db = require("../models");

// GET /comments/test - go here to test if we get a response
router.get("/test", (req, res) => {
    res.json({ test: "/test" });
});

// GET /comment/:articleId - get article comment page
router.get("/:articleId", (req, res) => {
    db.Article.findOne({
        _id: req.params.articleId
    })
        .populate("comments")
        .then(article => {
            res.render("comment", {
                article: article,
            });
        })
        .catch(err => res.send(err));
});

// POST /comment/:articleId - add comment
router.post("/:articleId", (req, res) => {
    new db.Comment({
        title: req.body.title,
        body: req.body.comment,
        article: req.params.articleId
    })
        .save()
        .then(comment => {
            db.Article.findOne({
                _id: comment.article
            })
                .then(article => {
                    article.comments.push(comment._id);
                    article
                        .save()
                        .then(article => {
                            res.redirect("/comment/" + comment.article);
                        })
                        .catch(err => res.send(err));
                })
                .catch(err => res.send(err));
        });
});

// DELETE /comment/:commentId - remove comment
router.delete("/:commentId", (req, res) => {
    db.Comment.findOneAndDelete({
        _id: req.params.commentId
    })
        .then(comment => {
            db.Article.findOneAndUpdate({
                _id: comment.article
            }, {
                    $pull: { comments: comment._id }
                }, {
                    returnNewDocument: true
                })
                .populate("comments")
                .then(article => {
                    res.render("comment", {
                        article: article,
                    });
                })
                .catch(err => res.send(err));
        })
        .catch(err => res.send(err));
});

module.exports = router;