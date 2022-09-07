# Associations

Prenons l'exemple d'une table USER qui viendrait s'ajouter à notre modèle.

Un USER peut avoir 0 ou N listes.

Chaque liste n'a qu'un propriétaire obligatoirement.

Ceci sous-entend une relation 1;N, on va donc avoir une clef étrangère du côté du 1. Quel est ce côté ? Le 1 ici représente l'information du propriétaire de la liste.

Nous créons donc une clef étrangère dans List qui pointe vers l'id de User.

## Sequelize

https://sequelize.org/docs/v6/core-concepts/assocs/

Cette relation vient donc être définit dans Sequelize par :

```js


/* ASSOCIATION 0,N */
User.hasMany(List,{
    as:"lists",
    foreignKey:"user_id"
});

/* ASSOCIATION 1,1 */
List.belongsTo(User,{ // on a belongsTo par rapport à la clef étrangère qui se trouve dans Card
    as:"user",
    foreignKey:"user_id"
});


```
