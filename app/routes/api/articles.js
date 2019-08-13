// Route for news article
var express = require('express');
var router = express.Router();
const db = require("../models");

// GET /api/articles/test - go here to test if we get a response
router.get("/test", (req, res) => {
    res.json({ test: "/api/article/test" });
});

// GET /api/article - route for getting all Articles from the db
router.get("/", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// GET /api/article/:id - route for grabbing a specific Article by id 
// and populate it with comments
router.get("/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("comments")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// POST /api/article/:id - route for updating an Article and comment
// params: { title: "...", body: "..." }, body is required    
router.post("/:id", function (req, res) {
    db.Comment.create(req.body)
        .then(function (dbComment) {
            return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                    comment: dbComment._id
                }, {
                    new: true
                });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// DELETE /api/article/:id - route for deleting an article via id
router.delete("/:id", function (req, res) {
    db.Article.deleteOne({
        _id: req.params.id
    })
        .then(result => {
            db.Comment.deleteMany({
                article: req.params.id
            })
                .then(delComments => {
                    res.json(delComments);
                })
                .catch(commErr => res.json(commErr));
        })
        .catch(err => res.json(err));
});

module.exports = router;