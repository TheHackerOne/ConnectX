const express = require('express');
const router = express.Router();
const path = require('path');

const homePageController = require('../connectors/homepage');

router.get('/', homePageController.getHomepage);

module.exports = router;