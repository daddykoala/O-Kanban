// par défaut, sans configuration spécifique, dotenv recherche le .env dans le même dossier que le fichier où il est appelé
require('dotenv').config(); 

const express = require("express");
const app = express();
const cors = require('cors');
const multer  = require('multer');
const sanitizer = require("./app/middlewares/bodySanitizer");
const router = require("./app/router");

// accepte : Content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// multer permet d'accepter des types d'envoi (place les données dans req.body)
// multer est essentiellement utilisé pour ce qui est "upload"
const upload = multer();
app.use(upload.none());
app.use(sanitizer);
// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());
/* CORS */
// on va accepter l'adresse localhost:5000
// le module CORS est l'agent de sécurité à l'entrée de notre API, il va permettre l'accès ou non à celle-ci
app.use(cors({
    origin:"http://localhost:3000"
}));
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});