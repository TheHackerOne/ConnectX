const express = require('express');
const router = express.Router();
const authenticationController = require('../connectors/authentication');

router.get("/signup", authenticationController.getSignUp);

router.post("/signup", authenticationController.postSignUp);

router.post("/signin", authenticationController.postSignIn);

router.get('/credentials/:userId', authenticationController.getCredentials);


module.exports = router;