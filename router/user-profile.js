const express = require('express');
const Router = express.Router();
const profileController = require('../connectors/profile');

Router.get("/profile/:userId", profileController.getProfile);

module.exports = Router;
