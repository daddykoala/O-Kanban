//par defaut sans configuration spécifique dotenv recherche le .env dans le meme dossier que le fichier ou il est appele
require('dotenv').config(); 
const cors = require('cors');
//j'importe le module express pour créer un serveur
const express = require("express");
const app = express();


// express.urlencoded permet d'accepter des types d'envoi (place les données dans req.body)
//extended: false permet d'accepter un objet contenant des clefs et des valeurs.si true, on peut envoyer des données complexes.
app.use(express.urlencoded({ extended: false }));

// multer permet d'accepter des types d'envoi (place les données dans req.body)

const upload = multer();
//upload.none() specifie que l'on accepte seulement des strings
app.use(upload.none());

//permet de parser les données au format json.
app.use(express.json());


app.use(cors({
    origin:"http://localhost:5000"
}));


app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});