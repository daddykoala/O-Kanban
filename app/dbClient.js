const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.PG_URL,{
   define:{
       underscored:true, // passe du camelCase au snake_case
       createdAt:"created_at",
       updatedAt:"updated_at",
 
   } ,
   logging: false
});

// Vérification de la connexion

   async function verif () {
    try {
        await sequelize.authenticate(); 
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }
    verif()

module.exports = sequelize;