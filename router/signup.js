const express = require('express');
const router = express.Router();
const path = require('path');
const signUpControler = require('../connectors/signup');

router.get('/signup', signUpControler.getSignUp);

router.post('/signup', signUpControler.postSignUp)

module.exports = router;
