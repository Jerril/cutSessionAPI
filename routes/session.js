const express = require("express");
const sessionController = require("../controllers/session");

const router = express.Router();

// Create session
router.post('/', sessionController.create_session);

// Book session
router.post('/book', sessionController.book_session);


module.exports = router;