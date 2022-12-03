const express = require("express");
const app = express();
const port = process.env.port || 8000;

app.get("/", (req, res) => res.send("This is CutSession API"));

app.listen(port, () => {
    console.log(`Server running at http://localhost/${port}}`)
});