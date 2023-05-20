const jwt = require('jsonwebtoken');
const { log } = require('../middlewares/errorHandling');

function generateAccessToken(user) {
    //on crée le token en donnat le secret
   
    console.log("ici on fait du token garcon");
    return jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `5d` });
}


function generateRefreshToken(user) {
    //on crée le token en donnant le secret 
    
    return jwt.sign({user: user}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: `1d`});
}

function authenticateToken(req, res, next) {
    //on recupere notre token dans le headers de la requete
  
    const authHeader = req.headers['authorization'];
    const accesToken = authHeader && authHeader.split(' ')[1];
    
    //si le accesToken n'existe pas on renvoi une erreur
    if (!accesToken) {
        console.log("pas si vite garcon");
        return res.sendStatus(401);
    }
    //on verifie la veracité du accesToken avec le secret.
    jwt.verify(accesToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403,err)//403 c'est forbidden;
        }  
        console.log("ok tu passes");  
        req.user = user;
        next();
    });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    authenticateToken,
    // generateAccessTokenBis
};