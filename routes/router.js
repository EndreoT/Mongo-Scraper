const express = require('express');
const controller = require('../controllers/controller');
const htmlController = require('../controllers/htmlController');


const router = express.Router();

// HTML routes
router.get('/', htmlController.scrape);

router.get('/saved', htmlController.saved);

// Article and Note routes
router.get('/articles', controller.getAllArticles);

router.get('/articles/:id', controller.getArticle);

router.post('/articles', controller.saveArticle);

router.post('/articles/:id', controller.saveNote);

router.delete('/articles/:id', controller.deleteArticle);

router.get('/notes/:id', controller.getNote);

router.delete('/notes/:id', controller.deleteNote);

module.exports = router;