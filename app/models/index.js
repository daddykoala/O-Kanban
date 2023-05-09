const List = require("./List");
const Card = require("./Card");
const Tag = require("./Tag");
const User = require("./User");
const Table = require("./Table");

User.hasMany(Table,{
    as:"table",
    foreignKey:"user_id"
});

Table.belongsTo(User, {
    as:"user",
    foreignKey:"user_id"});

// Table - List association
Table.hasMany(List, {
  as: "lists",
  foreignKey: "table_id"
});

List.belongsTo(Table, {
  as: "table",
  foreignKey: "table_id"
});


/* ASSOCIATION 0,N */
List.hasMany(Card,{
    as:"cards",
    foreignKey:"list_id"
});

/* ASSOCIATION 1,1 */

Card.belongsTo(List,{ // on a belongsTo par rapport à la clef étrangère qui se trouve dans Card
    as:"list",
    foreignKey:"list_id"
});

/* ASSOCIATION N;N entre Card et Tag */
Card.belongsToMany(Tag,{
    as:"tags",
    through:"card_has_tag", // trough permet de définir le nom de la table d'association
    foreignKey:"card_id", // correspond à l'id de la carte
    otherKey:"tag_id", // correspond à l'id du tag associé
    timestamps: false// on ne veut pas de colonne createdAt et updatedAt dans la table d'association
});

Tag.belongsToMany(Card,{
    as:"cards",
    through:"card_has_tag", // nom de la table d'association
    foreignKey:"tag_id",
    otherKey:"card_id",
    timestamps: false// on ne veut pas de colonne createdAt et updatedAt dans la table d'association
});

module.exports = { List, Card, Tag, User, Table};