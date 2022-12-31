// Import

// Create studio session
exports.create_session = (req, res) => {
    // Get the auth user
    res.status(200).json(req.user);
    // Get the session timing
    // validate if it follows the necessary requirement
    res.status(200).json({ "message": "Create session" });
}

// Fetch studio sessions
exports.fetch_sessions = (req, res) => {
    res.status(200).json({ "message": "Fetch studio sessions" });
}

// Book studio session
exports.book_session = (re, res) => {
    res.status(200).json({ "message": "Book studio session" });
}

// Retrieve session bookings
exports.fetch_session_bookings = (req, res) => {
    res.status(200).json({ "message": "Retrieve session bookings" });
}