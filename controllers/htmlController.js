const axios = require('axios');
const cheerio = require('cheerio');

const Article = require('../models/Article');


const scrapeUrl = 'https://www.kiro7.com/news';

exports.scrape = function (req, res) {
  // First, we grab the body of the html with axios
  axios.get(scrapeUrl).then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);

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
    });

    // Send a message to the client
    res.render('scrape', { articles: articles });
  });
};

exports.saved = function (req, res) {
  Article.find({})
    .then(articles => {
      res.render('saved', { articles });
    });
};