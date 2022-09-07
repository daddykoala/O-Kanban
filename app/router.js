const express = require("express");
const cardController = require("./controllers/cardController");
const tagController = require("./controllers/tagController");
const listController = require("./controllers/listController");
const errorHandling = require("./middlewares/errorHandling");

const router = express.Router();

/* LISTES */
router.get("/lists",listController.getAllLists);
router.post("/lists",listController.createList);

router.get("/lists/:id",listController.getOneList);
router.patch("/lists/:id",listController.updateById);
router.delete("/lists/:id",listController.deleteOneList);

/* CARTES */
router.get("/cards",cardController.getAllCards);
router.get('/lists/:id/cards', cardController.getCardsInList);
router.get('/cards/:id', cardController.getOneCard);
router.post('/cards', cardController.createCard);
router.patch('/cards/:id', cardController.modifyCard);
/**
 * Route pour créer ou modifier une carteo
 */
router.put('/cards/:id?', cardController.createOrModify);
router.delete('/cards/:id', cardController.deleteCard);


/* TAGS */
router.get('/tags', tagController.getAllTags);
router.post('/tags', tagController.createTag);
router.patch('/tags/:id', tagController.modifyTag);
router.put('/tags/:id?', tagController.createOrModify);
router.delete('/tags/:id', tagController.deleteTag);
router.post('/cards/:id/tags', tagController.associateTagToCard);
router.delete('/cards/:cardId/tags/:tagId', tagController.removeTagFromCard);

// gestion des 404
router.use(errorHandling.notFound);

module.exports = router;