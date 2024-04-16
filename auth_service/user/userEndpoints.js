
// Model
const { User } = require('../models');



const getUsers = async (req,res) => {

    let userf = await User.findAll();

    res.status(200).json(userf.map(user => {return {
        name: user.name,
        id: user.id
    }}));
}

const getUser = async (req, res) => {

    try{
        let userid = req.query;
        let user = await User.findOne({
            where: {
                user_id: userid
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
            user: user
        });

    }catch (error){
        res.status(500).send();
    }
}

const deleteUser = async (req, res) => {

    try{
        let userid = req.query;
        let result = await User.deleteOne(
            {user_id: userid}
        )

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.status(200).json({ message: "Usuario borrado" });


    }catch (error){
        res.status(500).send();
    }
}


module.exports = {getUsers, getUser, deleteUser}