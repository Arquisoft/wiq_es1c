
// Model
const { User } = require('../models');



function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.query)) {
        return false;
      }
    }
    return true;
}



const getUsers = async (req,res) => {
        let users = await User.findAll();
        res.status(200).json(users.map(user => ({
                name: user.name,
                id: user.id
            })));
}

const getUser = async (req, res) => {

    try{

        if(!validateRequiredFields(req,['user_id'])){
            res
                .status(401)
                .json({error:"Falta el campo userid"})
                .send();
            return;
        }

        let userid = req.query.user_id;
        let user = await User.findOne({
            where: {
                id: userid
            }
        })

        if(user == undefined){
            res
                .status(401)
                .json({error:"Usuario no encontrado"})
                .send();
            return;
        }

        res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
            }
        });

    }catch (error){
        res.status(500).send();
    }
}

const deleteUser = async (req, res) => {

    try{

        if(!validateRequiredFields(req,['user_id'])){
            res
                .status(401)
                .json({error:"Falta el campo userid"})
                .send();
            return;
        }


        let userid = req.query.user_id;

        let result = await User.destroy({ where: { id: userid } });

        if (result === 0) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        return res.status(200).json({ message: "Usuario borrado" });


    }catch (error){
        res.status(500).send();
    }
}


module.exports = {getUsers, getUser, deleteUser}