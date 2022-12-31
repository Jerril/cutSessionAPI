const express = require("express");
const authController = require("../controllers/auth");
const requestValidation = require('../utils/requestValidation');

const router = express.Router();

router.get('/clients', authController.list_clients);

router.post('/clients', requestValidation.signup, authController.register_client);

router.post('/signin', requestValidation.signin, authController.signin_client);

module.exports = router;