const errorHandling = {
    log(error){
        // j'affiche l'erreur dans la console
        console.error(error);

        // je renvoie une erreur 500 à l'utilisateur
        res.status(500).json({ error });
    },
    notFound(_,res){
        res.status(404).json({error:"Not Found"});
    },
    notFoundCustom(message,res){
        res.status(404).json({error:message});
    }
};

module.exports = errorHandling;