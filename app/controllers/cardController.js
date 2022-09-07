const errorHandling = require("../middlewares/errorHandling");
const { Card } = require("../models");

const cardController = {
    async getAllCards(req, res) {
        try {

            // je viens chercher l'intégralité des cartes

            // j'inclus la liste associée à chaque carte et ses tags

            // je souhaite avoir pour chaque tag, les cartes qui le possèdent

            const options = {
                // exemple uniquement pour le format et non la logique
                // on ne va pas utiliser cette route au final dans notre API


                // include : "tags" dans le cas où on souhaite n'avoir qu'une association, on peut directement mettre le nom de l'alias
                // include : ["tags","list"]
                include: [{
                    association: "tags", // la clef association attend l'alias de l'association
                    include: {
                        association: "cards"
                    }
                }, "list"] // on souhaite embarquer plusieurs associations, on passe en tableau
            };
            const cards = await Card.findAll(options);

            res.json(cards);
        }
        catch (error) {
            errorHandling.log(error);
        }
    },
    /**
     * Création d'une carte via le body de la requête
     * @param {*} req 
     * @param {*} res 
     */
    async createCard(req, res) {
        try {
            const { name, color, list_id } = req.body;

            let bodyErrors = [];
            if (!name) {
                bodyErrors.push(`name can not be empty`);
            }
            if (!list_id) {
                bodyErrors.push(`list_id can not be empty`);
            }

            if (bodyErrors.length) {
                res.status(400).json(bodyErrors);
            } else {
                // je calcule la position de la nouvelle liste par rapport aux listes existantes
                const position = await Card.count({where:{list_id}})+1;

                let newCard = Card.build({ name, list_id, position });
                if (color) {
                    newCard.color = color;
                }
                await newCard.save();
                res.json(newCard);
            }

        } catch (error) {
            errorHandling.log(error);
        }
    },
    async modifyCard(req, res) {
        try {
            const cardId = req.params.id;
            const { name, color, list_id, position } = req.body;

            // on inclue les tags pour pouvoir les renvoyer à la fin de l'update
            let card = await Card.findByPk(cardId, {
                include: ['tags']
            });
            if (!card) {
                errorHandling.notFoundCustom(`Cant find card with id ${cardId}`, res);
            } else {
                // on ne change que les paramètres envoyés
                if (name) {
                    card.name = name;
                }
                if (list_id) {
                    card.list_id = list_id;
                }
                if (color) {
                    card.color = color;
                }
                if (position) {
                    card.position = position;
                }
                await card.save();
                res.json(card);
            }

        } catch (error) {
            errorHandling.log(error);
        }
    },
    async getOneCard(req, res) {
        try {
            const cardId = req.params.id;
            const card = await Card.findByPk(cardId, {
                include: 'tags',
                order: [
                    ['position', 'ASC']
                ]
            });
            if (!card) {
                res.status(404).json('Cant find card with id ' + cardId);
            } else {
                res.json(card);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async createOrModify(req, res) {
        try {
            let card;
            if (req.params.id) {
                card = await Card.findByPk(req.params.id);
            }
            if (card) {
                await cardController.modifyCard(req, res);
            } else {
                await cardController.createCard(req, res);
            }
        } catch (error) {
            console.trace(error);
            res.status(500).send(error);
        }
    },
    async deleteCard(req, res) {
        try {
            const cardId = req.params.id;
            let card = await Card.findByPk(cardId);
            if (!card) {
                res.status(404).json(`Cant find card with id ${cardId}`);
            } else {
                await card.destroy();
                res.json('ok');
            }

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },
    async getCardsInList(req, res) {
        try {
          const listId = req.params.id;
          const cards = await Card.findAll(
            {
              where: {
                list_id: listId
              },
              include: 'tags',
              order: [
                ['position', 'ASC']
              ]
            });
    
          if (!cards) {
            res.status(404).json('Cant find cards with list_id ' + listId);
          } else {
            res.json(cards);
          }
    
        } catch (error) {
          console.trace(error);
          res.status(500).json(error);
        }
      },
};

module.exports = cardController;