const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

// Register client(merchant/user)
router.post('/register', userController.register_user);

// Signin client
router.post('/signin', userController.signin_user);


module.exports = router;