const axios = require('axios');
const cheerio = require('cheerio');

// Require all models
const Article = require('../models/Article');
const Note = require('../models/Note');

const scrapeUrl = 'https://www.kiro7.com/news';

// A GET route for scraping the echoJS website
exports.scrape = function (req, res) {
  // First, we grab the body of the html with axios
  axios.get(scrapeUrl).then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);

    // Save an empty result object

    const articles = [];


    $('#main-content').find($('#column-7')).find($('.list.media')).find('li').each(function (i, element) {
      const article = {};

      const headline = $(element).find($('a')).attr('title');
      const summary = $(element).find($('.abstract.dotdotdot-crop')).text() || 'No summary provided.';
      const url = $(element).find($('a')).attr('href');

      article.headline = headline;
      article.summary = summary;
      article.url = url;
      articles.push(article);

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
    console.log(articles.length);
    res.json(articles);
  });
};

// Route for getting all Articles from the db
exports.getAllArticles = function (req, res) {
  // TODO: Finish the route so it grabs all of the articles
  Article.find({})
    .then(articles => {
      return res.json(articles);
    }).catch(err => {
      console.log(err);
      res.json(err);
    });
};

// Route for grabbing a specific Article by id, populate it with it's note
app.get('/articles/:id', function (req, res) {
  // TODO
  // ====
  // Finish the route so it finds one article using the req.params.id,
  // and run the populate method with "note",
  // then responds with the article with the note included
  Article
    .findOne({ _id: req.params.id })
    // .populate('note')
    .then(article => {
      return res.json(article);
    }).catch(err => {
      console.log(err);
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post('/articles/:id', function (req, res) {
  // TODO
  // ====
  // save the new note that gets posted to the Notes collection
  // then find an article from the req.params.id
  // and update it's "note" property with the _id of the new note
  const articleId = req.params.id;
  Note
    .create(req.body)
    .then((note) => {
      Note.findByIdAndUpdate(note._id, {
        $set: {
          article: articleId
        }
      }, { new: true }).then(note => {
        return res.json(note);
      });
    }).catch(err => {
      console.log(err);
      res.json(err);
    });
});
