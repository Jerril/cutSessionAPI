const express = require("express");
const sessionController = require("../controllers/session");
const { route } = require("./auth");

const router = express.Router();

// Create studio session
router.post('/', sessionController.create_session);

// Fetch studio sessions
router.get('/', sessionController.fetch_sessions);

// Book studio session
route.post('/book', sessionController.book_session);

// Retrieve session bookings
router.post('/book', sessionController.fetch_session_bookings);

module.exports = router;