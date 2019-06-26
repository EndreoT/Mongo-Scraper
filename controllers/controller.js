const axios = require('axios');
const cheerio = require('cheerio');

// Require all models
const Article = require('../models/Article');
const Note = require('../models/Note');

const scrapeUrl = 'https://www.kiro7.com/news';


exports.scrape = function (req, res) {
  // First, we grab the body of the html with axios
  axios.get(scrapeUrl).then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);

    let numArticles = 0;

    $('#main-content').find($('#column-7')).find($('.list.media')).find('li').each(function (i, element) {
      numArticles++;

      const article = {};

      const headline = $(element).find($('a')).attr('title');
      const summary = $(element).find($('.abstract.dotdotdot-crop')).text() || 'No summary provided.';
      const url = $(element).find($('a')).attr('href');

      article.headline = headline;
      article.summary = summary;
      article.url = url;

      // Create a new Article using the `result` object built from scraping
      Article.create(article)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.json(`Successfully scraped ${numArticles} articles!`);
  });
};

// Route for getting all Articles from the db
exports.getAllArticles = function (req, res) {
  Article.find({})
    .populate('notes')
    .then(articles => {
      return res.json(articles);
    }).catch(err => {
      console.log(err);
      res.json(err);
    });
};

// Route for grabbing a specific Article by id, populate it with its notes
exports.getArticle = function (req, res) {
  Article
    .findOne({ _id: req.params.id })
    .populate('notes')
    .then(article => {
      return res.json(article);
    }).catch(err => {
      console.log(err);
      res.json(err);
    });
};

exports.deleteArticle = function (req, res) {
  Article
    .deleteOne({ _id: req.params.id })
    .then(article => {
      return res.json(article);
    }).catch(err => {
      console.log(err);
      res.json(err);
    });
};

exports.getNote = function (req, res) {
  Note
    .findOne({ _id: req.params.id })
    .populate('article')
    .then(note => {
      return res.json(note);
    }).catch(err => {
      console.log(err);
      res.json(err);
    });
};

// Route for saving/updating an Article's associated Note
exports.saveNote = function (req, res) {

  // save the new note that gets posted to the Notes collection
  const articleId = req.params.id;
  const note = {
    body: req.body.body,
    article: articleId,
  };
  Note
    .create(note)
    .then(note => {
      res.json(note);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
};

exports.deleteNote = function (req, res) {
  Note
    .deleteOne({ _id: req.params.id })
    .then(note => {
      return res.json(note);
    }).catch(err => {
      console.log(err);
      res.json(err);
    });
};