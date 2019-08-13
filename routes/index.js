// Route for landing page
var express = require('express');
var router = express.Router();
const db = require("../models");
const scraper = require("./api/scrape");

// GET /test - go here to test if we get a response
router.get("/test", (req, res) => {
    res.json({ test: "/test" });
});

// GET route for all articles
router.get("/", (req, res) => {
    db.Article.find({}).sort({ createdAt: -1 })
        .then(result => {
            console.log(`Article count: ${result.length}`);
            res.render("index", { article: result });
        })
        .catch(err => {
            res.render("index", { article: "failed to get articles" });
        });
});

// GET route for articles user commented on
router.get("/commented", (req, res) => {
    db.Article.find({
        comments: {
            $exists: true,
            $ne: []
        }
    }).sort({ createdAt: -1 })
        .then(result => {
            console.log(`Article count(commented): ${result.length}`);
            res.render("index", { article: result });
        })
        .catch(err => {
            res.render("index", { article: "failed to get articles" });
        });
});

// GET route to scrape for articles
router.get("/scrape", (req, res) => {
    const articles = scraper();
    res.redirect("/");
});

module.exports = router;