const errorHandling = require("../middlewares/errorHandling");
const { User, Table } = require("../models");

const tableController = {
  async getAllTables(req, res) {
    try {
      const tables = await Table.findAll({
        include: [{ model: User, as: 'user' }],
      });
      res.json(tables);
    } catch (error) {
      errorHandling.log(error);
    }
  },
  async createTable(req, res) {
    try {
      const { name, user_id } = req.body;

      let bodyErrors = [];
      if (!name) {
        bodyErrors.push(`name can not be empty`);
      }
      if (!user_id) {
        bodyErrors.push(`user_id can not be empty`);
      }

      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
      } else {
        const position = await Table.count({ where: { user_id } }) + 1;

        const newTable = Table.build({ name, user_id, position });
        await newTable.save();
        res.json(newTable);
      }
    } catch (error) {
      errorHandling.log(error);
    }
  },
  async modifyTable(req, res) {
    try {
      const tableId = req.params.id;
      const { name, user_id, position } = req.body;

      let table = await Table.findByPk(tableId);
      if (!table) {
        errorHandling.notFoundCustom(`Cant find table with id ${tableId}`, res);
      } else {
        if (name) {
          table.name = name;
        }
        if (user_id) {
          table.user_id = user_id;
        }
        if (position) {
          table.position = position;
        }
        await table.save();
        res.json(table);
      }
    } catch (error) {
      errorHandling.log(error);
    }
  },
  async deleteTable(req, res) {
    try {
      const tableId = req.params.id;
      let table = await Table.findByPk(tableId);
      if (!table) {
        res.status(404).json(`Cant find table with id ${tableId}`);
      } else {
        await table.destroy();
        res.json('ok');
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
};

module.exports = tableController;