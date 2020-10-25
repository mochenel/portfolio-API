const express = require("express")
const path = require('path')
const app = express()
const cors = require('cors');
app.use(cors());

const resumePath = path.join(__dirname, 'public/resume/Freddy.pdf');
app.get("/resume", (req, res) => {
    res.sendFile(resumePath)
});

const PORT = process.env.PORT || 2000
app.listen(PORT);