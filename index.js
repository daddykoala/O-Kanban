require('dotenv').config();

const express = require("express");
const https = require('https');
const fs = require('fs');
const app = express();
const cors = require('cors');
const multer  = require('multer');
const sanitizer = require("./app/middlewares/bodySanitizer");
const router = require("./app/router");
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

const upload = multer();
app.use(upload.none());
app.use(sanitizer);

app.use(express.json());

app.use(cors({
    origin:"https://localhost:3000"
}));

app.use(router);

const PORT = process.env.PORT || 3000;

const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
};

const server = https.createServer(options, app);

server.listen(PORT, () => {
    console.log(`Serveur démarré sur https://localhost:${PORT}`);
});
