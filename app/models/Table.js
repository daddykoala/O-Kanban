const { DataTypes, Model} = require("sequelize");
const sequelize = require("../dbClient.js");
class table extends Model{};

table.init({
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

  module.exports = table ;