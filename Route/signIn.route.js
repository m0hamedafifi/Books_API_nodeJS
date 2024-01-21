const express = require("express");
const router = express.Router();
const signInController = require("../Controller/signIn.controller");

router.post("/users/login",signInController.getSignInPage);

module.exports = router;



