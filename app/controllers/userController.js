const errorHandling = require("../middlewares/errorHandling");
const { User, Table } = require("../models");


const userController = {

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({ include: "table" });
      res.json(users);
    } catch (error) {
      errorHandling.log(error);
    }
  },

  async getOneUser(req, res) {
    console.log(User);
    try {
      console.log(req.params.id);
        const userId = req.params.id;
        const user = await User.findByPk(userId, {
            include:[{
              association:"table",
              include:[{
                association:"list",
                include:[{
                  association:"card",
                  include:[{association:"tag"}]}
                ]}]
          }],
           
        });
        if (!user) {
          
          res.status(404).json({message:`Cant find user with id ${userId}`});

        } else {
            res.json(user);
        }
    } catch (error) {
        errorHandling.log(error);
    }
    },

  async createUser(req, res) {
    try {
      const {email ,name,lastname} = req.body;
      console.log(email , name , lastname);  

      let bodyErrors = [];
      if (!name) {
        bodyErrors.push(`name can not be empty`);
      }
      if (!lastname) {
        bodyErrors.push(`name can not be empty`);
      }
      
      if (!email ) {
        bodyErrors.push(`Invalid email`);
      }

      // if (bodyErrors.length) {
      //   res.status(400).json(bodyErrors);
      // } 
      else {
        let newUser = User.build({ name,lastname, email });
        await newUser.save();
        res.json(newUser);
      }
    } catch (error) {
      errorHandling.log(error);
    }
  },

  async modifyUser(req, res) {
    try {
      const userId = req.params.id;
      const { name, email } = req.body;

      let user = await User.findByPk(userId, {
        include: "tables",
      });
      if (!user) {
        errorHandling.notFoundCustom(`Cant find user with id ${userId}`, res);
      } else {
        if (name) {
          user.name = name;
        }
        if (email) {
          user.email = email;
        }
        await user.save();
        res.json(user);
      }
    } catch (error) {
      errorHandling.log(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      let user = await User.findByPk(userId, { include: "tables" });
      if (!user) {
        res.status(404).json(`Cant find user with id ${userId}`);
      } else {
        await user.destroy();
        res.json("ok");
      }
      
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
};

module.exports = userController;