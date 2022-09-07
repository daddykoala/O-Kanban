const sanitizer = require("sanitizer");

const bodySanitizer = (req,res,next)=>{
    if(req.body){
        // je parcours les clefs du body
        for(const property in req.body){
            // je nettoie chaque valeur pour chaque clef
            req.body[property] = sanitizer.escape(req.body[property]);
        }
    }

    next();
};

module.exports = bodySanitizer;