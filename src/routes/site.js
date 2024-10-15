const express = require('express');
var router = express.Router();

const siteController = require('../app/controllers/SiteControllers');

router.get('/:slug', siteController.search);
router.get('/', siteController.index);

module.exports = router;
