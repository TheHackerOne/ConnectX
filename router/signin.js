const express = require('express');
const router = express.Router();
const path = require('path');
const signInController = require('../connectors/signin');

router.post('/signin', signInController.postSignIn);

module.exports = router;