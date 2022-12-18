// Import


// List clients
exports.list_clients = (req, res) => {
    res.status(200).json({ "message": "Retun list of clients on the platform" });
}

// Register user
exports.register_user = (req, res) => {
    res.status(200).json({ "message": "Register user" });
}

// Register merchant
exports.register_user = (req, res) => {
    res.status(200).json({ "message": "Register merchant" });
}

// Sign in client
exports.signin_client = (req, res) => {
    res.status(200).json({ "message": "Sign in client" });
}