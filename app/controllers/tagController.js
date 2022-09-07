const { Tag, Card } = require('../models');

const tagController = {
    async getAllTags (req, res) {
    try {
      const tags = await Tag.findAll();
      res.json(tags);
    } catch (error) {
        errorHandling.log(error);
    }
  },

  async createTag (req, res){
    try {
      const { name, color } = req.body;
      let bodyErrors = [];
      if (!name) {
        bodyErrors.push('name can not be empty');
      }
      if (!color) {
        bodyErrors.push('color can not be empty');
      }

      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
      } else {
        let newTag = Tag.build({ name, color });
        await newTag.save();
        res.json(newTag);
      }

    } catch (error) {
        errorHandling.log(error);
    }
  },

  async modifyTag(req, res) {
    try {
      const tagId = req.params.id;
      const { name, color } = req.body;

      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        res.status(404).json('Can not find tag with id ' + tagId);
      } else {
        if (name) {
          tag.name = name;
        }
        if (color) {
          tag.color = color;
        }
        await tag.save();
        res.json(tag);
      }

    } catch (error) {
        errorHandling.log(error);
    }
  },

  async createOrModify (req, res) {
    try {
      let tag;
      if (req.params.id) {
        tag = await Tag.findByPk(req.params.id);
      }
      if (tag) {
        await tagController.modifyTag(req, res);
      } else {
        await tagController.createTag(req, res);
      }
    } catch (error) {
        errorHandling.log(error);
    }
  },

  async deleteTag(req, res) {
    try {
      const tagId = req.params.id;
      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        res.status(404).json('Can not find tag with id ' + tagId);
      } else {
        await tag.destroy();
        res.json('OK');
      }
    } catch (error) {
        errorHandling.log(error);
    }
  },

  async associateTagToCard (req, res) {
    try {
      console.log(req.body);
      const cardId = req.params.id;
      const tagId = req.body.tag_id;

      // 1. je viens chercher la carte par son ID
      let card = await Card.findByPk(cardId, {
        include: ['tags']
      });
      if (!card) {
        return res.status(404).json('Can not find card with id ' + cardId);
      }

      // 2. je viens chercher le tag par son ID
      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        return res.status(404).json('Can not find tag with id ' + tagId);
      }

      // 3. on laisse faire la magie de Sequelize !
      // pas besoin de save, Sequelize vient lier le tag à la carte automatiquement en BDD
      // en BDD, ça crèe un enregistrement dans la table d'association
      await card.addTag(tag);
      // malheureusement, les associations de l'instance ne sont pas mises à jour
      // on doit donc refaire un select
      card = await Card.findByPk(cardId, {
        include: ['tags']
      });
      res.json([card, tag]);

    } catch (error) {
        errorHandling.log(error);
    }
  },

  async removeTagFromCard (req, res) {
    try {
      const { cardId, tagId } = req.params;

      let card = await Card.findByPk(cardId);
      if (!card) {
        return res.status(404).json('Can not find card with id ' + cardId);
      }

      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        return res.status(404).json('Can not find tag with id ' + tagId);
      }

      await card.removeTag(tag);
      card = await Card.findByPk(cardId, {
        include: ['tags']
      });
      res.json(card);

    } catch (error) {
        errorHandling.log(error);
    }
  }
};

module.exports = tagController;