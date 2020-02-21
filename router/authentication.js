const express = require('express');
const router = express.Router();
const authenticationController = require('../connectors/authentication');
const isAuth = require('../middleware/auth')

router.get("/signup", authenticationController.getSignUp);

router.post("/signup", authenticationController.postSignUp);

router.get("/login", authenticationController.getLogIn);

router.post("/login", authenticationController.postLogIn);

router.get('/credentials', isAuth.authenticated, authenticationController.getCredentials);


module.exports = router;