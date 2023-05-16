//j'importe le module express
const express = require("express");
const {authenticateToken} = require("./service/jsonWebToken");
// je crée un router a l'aide la mehtode Router() de express
const router = express.Router();

// j'importe les controllers
const cardController = require("./controllers/cardController");
const tagController = require("./controllers/tagController");
const listController = require("./controllers/listController");
const tableController = require("./controllers/tableController");
const userController = require("./controllers/userController");

// j'importe le middleware d'erreur pour les 404
const errorHandling = require("./middlewares/errorHandling");

//créer les routes pour créer,supprimer,modifier les utilsateurs
// pour trouver un utilisateur, on va utiliser son id
router.get("/users/:id",authenticateToken,userController.getOneUser);
router.get("/users",userController.getAllUsers);
router.post("/users/findByEmail/",userController.loginUser);
router.post("/users/create",userController.createUser);
router.patch("/users/:id",userController.modifyUser);


//créer les routes poyur recuperer ,supprimir et midifier les tables
router.get("/tables",authenticateToken,tableController.getAllTables);
// router.get("/tables/:id",tableController.getOneTable);
router.post("/tables",authenticateToken,tableController.createTable);
router.delete("/tables/:id",authenticateToken,tableController.deleteTable);
router.patch("/tables/:id",authenticateToken,tableController.modifyTable);
// j'associe chaque routes à la methode du controller qui lui correspond
//getAllLists est la requete qui va chercher toutes les listes a l'ouverture de la page
//elle retourne un fichier json avec toutes les listes et leurs cartes et tags.
router.get("/lists",authenticateToken,listController.getAllLists);

//Si un utilisateur clique sur le bouton "ajouter une liste" dans le front, il va envoyer une requete POST
router.post("/lists",authenticateToken,listController.createList);
//le parametre ":id" est le parametre qui va etre envoye par le front. Il correspond a l'id de la liste
router.get("/lists/:id",authenticateToken,listController.getOneList);
//Si un utilisateur clique sur le bouton "modifier" dans le front, il va envoyer une requete PATCH
router.patch("/lists/:id",authenticateToken,listController.updateById);
//Si un utilisateur clique sur le bouton "supprimer" dans le front, il va envoyer une requete DELETE.
router.delete("/lists/:id",authenticateToken,listController.deleteOneList);

/* CARTES */
router.get("/cards",authenticateToken,cardController.getAllCards);
router.get('/lists/:id/cards',authenticateToken, cardController.getCardsInList);
router.get('/cards/:id',authenticateToken, cardController.getOneCard);
router.post('/cards',authenticateToken, cardController.createCard);
router.patch('/cards/:id',authenticateToken, cardController.modifyCard);
/**
 * Route pour créer ou modifier une carte
 */
router.put('/cards/:id?', authenticateToken,cardController.createOrModify);
router.delete('/cards/:id',authenticateToken, cardController.deleteCard);


/* TAGS */
router.get('/tags',authenticateToken, tagController.getAllTags);
router.post('/tags',authenticateToken, tagController.createTag);
router.patch('/tags/:id',authenticateToken, tagController.modifyTag);
router.put('/tags/:id?', authenticateToken,tagController.createOrModify);
router.delete('/tags/:id',authenticateToken, tagController.deleteTag);
router.post('/cards/:id/tags',authenticateToken, tagController.associateTagToCard);
router.delete('/cards/:cardId/tags/:tagId',authenticateToken, tagController.removeTagFromCard);

// gestion des 404
router.use(errorHandling.notFound);

//j'exporte le router que je vais utiliser dans app/index.js
module.exports = router;