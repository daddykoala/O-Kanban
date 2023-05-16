const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    //on crée le token en donnat le secret
    console.log(process.env.ACCESS_TOKEN_SECRET);
    console.log(user);
    console.log("ici");
    return jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `5m` });
}


function generateRefreshToken(user) {
    //on crée le token en donnant le secret 
    return jwt.sign({user: user}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: `1d`});
}

function authenticateToken(req, res, next) {
    //on recupere notre token dans le headers de la requete
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //si le token n'existe pas on renvoi une erreur
    if (!token) {
        return res.sendStatus(401);
    }
    //on verifie la veracité du token avec le secret.
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)//403 c'est forbidden;
        }    
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