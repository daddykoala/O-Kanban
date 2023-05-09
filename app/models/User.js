const { DataTypes, Model} = require("sequelize");
const sequelize = require("../dbClient.js");
class User extends Model{};



User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
        type:DataTypes.TEXT,
        allowNull: false
    },

  },{
    sequelize,
    tableName:"user"
});

  module.exports = User;