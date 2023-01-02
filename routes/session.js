const express = require("express");
const sessionController = require('../controllers/session');
const { isMerchant, isUser } = require('../utils/checkAccessType');
const requestValidation = require('../utils/requestValidation');

const router = express.Router();


// Create studio session
router.post('/', isMerchant, requestValidation.create_session, sessionController.create_session);
// Fetch studio sessions
router.get('/', isMerchant, sessionController.fetch_sessions);

// Book studio session
router.post('/book', isUser, sessionController.book_session);
// Retrieve session bookings
router.get('/bookings', sessionController.fetch_session_bookings);

module.exports = router;