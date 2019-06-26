const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();


router.get('/scrape', controller.scrape);

router.get('/articles', controller.getAllArticles);

module.exports = router;