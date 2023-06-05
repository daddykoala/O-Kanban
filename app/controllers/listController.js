
const errorHandling = require("../middlewares/errorHandling");
const { List } = require("../models");

const listController = {
    // je viens récupérer l'intégralité des listes
    async getAllLists(req, res) {
        try {
            // findAll() est une méthode herité de model, elle permet de récupérer toutes les listes en BDD.
            const allLists = await List.findAll({
                // je souhaite embarquer les cartes associées à chaque liste
                include: [
                    {
                        association: "cards",
                        // je souhaite embarquer les tags associés à chaque carte
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
            })
            // je renvoie les listes dans la réponse
            res.json(allLists);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
    },

    async createList(req, res) {
// je récupère ce qui est envoyé par la requête POST
        const list = req.body; 
        console.log(list);
        try {
            // je vérifie que les données envoyées ont la propriété name
            if (!list.name) {
                throw "Le nom de la liste doit être précisé";
            }
            if (!list.tableId) {
                throw "L'ID du tableau doit être précisé";
              }
            // je calcule la position de la nouvelle liste par rapport aux listes existantes
            const listPosition = await List.count({where:{table_id:list.tableId}})+1;
//List
            let newList = List.build({
                name:list.name,position:listPosition, table_id:list.tableId
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
            console.log("",req.body);
            const listID = req.params.id;
            console.log("typoeof",typeof listID,listID);
            

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
            const tableId = req.body.tableId;
         
            console.log("listID",listID);
           

            const list = await List.findOne({
                where:{
                    id:listID,
                }
            });
            if (!list) {
                throw "Impossible de supprimer la liste avec cet id";
            }
            if (list === undefined) {
                res.json("id cloche");
            }

            // je supprime en BDD
            await list.destroy();
console.log("c'est passé");
            // je viens récupérer les listes du tableau
            const result = await List.findAll({
                where:{
                    table_id:tableId
                },
            });
console.log(result);
            res.json(result);
        }
        catch(error){
            errorHandling.log(error);
            res.json("id cloche");
        }
    }
};

module.exports = listController;