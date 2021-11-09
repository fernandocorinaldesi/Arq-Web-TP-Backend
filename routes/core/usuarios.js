const express = require("express");
const router = express.Router();
const authController = require("../../controllers/core/usuarios");
const validator = require("../validator");
const passport = require('passport');

router.post("/login", validator.loginValidationRules(),validator.loginValidate,authController.login);
router.post('/register', validator.registerValidationRules()
   ,validator.registerValidate, passport.authenticate('local.signup', {
   failureFlash: true}),authController.signup)

module.exports = router;