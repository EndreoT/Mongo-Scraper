// Require all models
const Article = require('../models/Article');
const Note = require('../models/Note');


exports.saveArticle = function (req, res) {
  Article.create(req.body)
    .then(function (article) {
      res.json(article);
    })
    .catch(function (err) {
      // If an error occurred, log it
      console.log(err);
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