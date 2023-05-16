const jwt = require('jsonwebtoken');
const { log } = require('../middlewares/errorHandling');

function generateAccessToken(user) {
    //on crée le token en donnat le secret
   
    console.log("ici on fait du token garcon");
    return jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `5m` });
}


function generateRefreshToken(user) {
    //on crée le token en donnant le secret 
    
    return jwt.sign({user: user}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: `1d`});
}

function authenticateToken(req, res, next) {
    //on recupere notre token dans le headers de la requete
    console.log(req.headers);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //si le token n'existe pas on renvoi une erreur
    if (!token) {
        console.log("pas si vite garcon");
        return res.sendStatus(401);
    }
    //on verifie la veracité du token avec le secret.
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
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