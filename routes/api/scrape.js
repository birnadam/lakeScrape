// Scrape function, not a route 
"use strict";
const db = require("../../models");
const axios = require("axios");
const cheerio = require("cheerio");

// Targetting Lakers Bleacher Report to scrape
const lbrURL = "https://bleacherreport.com/los-angeles-lakers";

function scrapeLBR(url = lbrURL) {
    // Grabbing the body of HTML with Axios
    axios.get(url).then(response => {
        // Collecting the articles in the body
        const articleInfo = collectLBRNews(response.data).map(article => {
            return article;
        });
        console.log(`Found ${articleInfo.length} articles`);
        addArticles(articleInfo);
    });
}

// Collect articles on the Lakers Bleacher Report web page
// params: data = axios GET request response.data object
// return: an array of article info objects
function collectLBRNews(data) {
    let articles = [];
    const $ = cheerio.load(data);

    // HTML element context where articles are placed
    const contexts = [$("#outer-container #main-content .sectionPage .contentStream .cell")];
    contexts.forEach(context => {
        context.each(function (i, element) {
            articles.push({
                headline: $(".commentary h3", element).text(),
                summary: $(".commentary p", element).text(),
                link: $(".articleMedia a", element).attr("href"),
                imageURL: $(".articleMedia a img", element).attr("src")
            });
        });
    });
    return articles;
}

// Insert articles into Article collection
function addArticles(articles) {
    console.log(`Adding ${articles.length} articles`);
    articles.forEach(item => {
        db.Article.findOneAndUpdate({
            link: item.link
        },
            item, {
                upsert: true,
                returnNewDocument: true
            })
            .then(doc => {
                ;
            })
            .catch(err => console.log(err));
    });
}

module.exports = scrapeLBR;