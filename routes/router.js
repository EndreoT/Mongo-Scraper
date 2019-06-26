const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();


router.get('/scrape', controller.scrape);

router.get('/articles', controller.getAllArticles);

router.get('/articles/:id', controller.getArticle);

router.post('/articles/:id', controller.saveNote);

module.exports = router;