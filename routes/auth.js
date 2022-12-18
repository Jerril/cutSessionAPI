const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

// Fetch clients(users & merchants)
router.get('/clients', authController.list_clients);

// Register end users
router.post('/users/register', authController.register_user);

// Register merchants (studios)
router.post('/merchants/register', authController.register_merchant);

// Sign in clients(users & merchants)
router.post('/signin', authController.signin_client);

module.exports = router;