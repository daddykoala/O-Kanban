const { DataTypes, Model} = require("sequelize");
const sequelize = require("../dbClient.js");
class Table extends Model{};

Table.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    sequelize,
    tableName:"table"
}
  );

  module.exports = Table ;