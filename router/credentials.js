const express = require('express');
const router = express.Router();
const credentialController = require('../connectors/credentials');

router.get('/credentials/:userId', credentialController.getCredentials)

module.exports = router;