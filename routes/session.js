const express = require("express");
const sessionController = require("../controllers/session");

const router = express.Router();

/*
    Merchant
*/
// Create studio session
router.post('/', sessionController.create_session);
// Fetch studio sessions
router.get('/', sessionController.fetch_sessions);

/*
    Customer
*/
// Book studio session
router.post('/book', sessionController.book_session);
// Retrieve session bookings
router.get('/bookings', sessionController.fetch_session_bookings);

module.exports = router;