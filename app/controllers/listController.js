const res = require("express/lib/response");
const errorHandling = require("../middlewares/errorHandling");

const { List } = require("../models");

const listController = {
    async getAllLists(req, res) {
        try {
            const allLists = await List.findAll({
                include: [
                    {
                        association: "cards",
                        include: [{
                            association: "tags"
                        }]
                    }
                ],
                order:[
                    // je viens ordonner les listes par position croissante
                    ["position","ASC"],
                    // et les cards par position croissante
                    ["cards","position","ASC"]
                ]
            });

            // throw "il y a une erreur"; // <-- permet de lever une exception
            res.json(allLists);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
    },
    async createList(req, res) {
        const list = req.body; // je récupère ce qui est envoyé par la requête POST
        console.log(list);
        try {
            // je vérifie que les données envoyées ont la propriété name
            if (!list.name) {
                throw "Le nom de la liste doit être précisé";
            }

            // je vérifie que les données envoyées ont la propriété position
            // if(!list.position){
            //     throw "La position de la liste doit être précisée";
            // }

            // je calcule la position de la nouvelle liste par rapport aux listes existantes
            const listPosition = await List.count()+1;

            let newList = List.build({
                name:list.name,position:listPosition
            });

            // le .save() vient insérer en BDD notre objet, au retour, il vient mettre à jour l'id de celui-ci
            console.log("avant",newList);
            // j'enregistre en BDD
            await newList.save();
            console.log("après",newList);

            res.json(newList);
        }
        catch (error) {
            errorHandling.log(error);
        }
    },
    async getOneList(req,res) {
        try{
            // 1. je récupère l'id dans les paramètres de l'url (query string)
            const listID = req.params.id;

            // 2. je récupère la liste en BDD via son id
            const list = await List.findByPk(listID,{
                include: [
                    {
                        association: "cards",
                        include: [{
                            association: "tags"
                        }]
                    }
                ],
                order:[
                    // les cards par position croissante
                    ["cards","position","ASC"]
                ]
            });

            // 2.1 je vérifie que la liste ne soit pas vide
            if(!list){
                res.status(404).json("Impossible to retreive the list with this id");
            }
            else{
                // 3. j'envoie la liste dans la réponse
                res.json(list);
            }
        }
        catch(error){
            errorHandling.log(error);
        }
     },
    async updateById(req,res) {
        try{
            const listID = req.params.id;

            // je viens récupérer la liste en BDD
            const list = await List.findByPk(listID);

            // je vérifie si une liste a été trouvée
            if(!list){
                res.status(404).json("Impossible to retreive the list with this id");
            }
            else{
                if(req.body.name){ // je vérifie si on souhaite modifier le nom
                    list.name = req.body.name;
                }

                if(req.body.position){ // je vérifie si on souhaite modifier la position
                    list.position = req.body.position;
                }

                // je mets à jour en BDD
                await list.save();

                res.json(list);
            }
        }
        catch(error){
            errorHandling.log(error);
        }
     },
    async deleteOneList(req,res) { 
        try{
            const listID = req.params.id;
            const list = await List.findByPk(listID);

            // je supprime en BDD
            await list.destroy();

            res.json("OK");
        }
        catch(error){
            errorHandling.log(error);
        }
    }
};

module.exports = listController;