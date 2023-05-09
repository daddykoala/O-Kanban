
//j'importe Model et DataTypes de sequelize
//DataTypes permet de définir le type de chaque colonne
const { DataTypes, Model} = require("sequelize");
//j'importe la connexion à la base de données
const sequelize = require("../dbClient.js");

//je crée ma classe List qui hérite de Model
class List extends Model{};
//le .init permet de lister les propriétés de la classevu dans le mpd.
List.init({
    //je controle le type de chaque colonne sinon postgres va refuser la requête
    //si elle ne correspond pas au type de la colonne.
    name:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    position:DataTypes.INTEGER
},{
    //je donne les informations de connection à sequelize
    sequelize,
    //je passe le nom de la table
    tableName:"list"
});


module.exports = List;