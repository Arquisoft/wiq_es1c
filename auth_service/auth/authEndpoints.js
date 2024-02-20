//External libs
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Model
const user = require('../db/models/user');

const privateKey = "ChangeMePlease!!!!"


function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        return false;
      }
    }
    return true;
}

const login = async (req, res) => {
    try {
        if(!validateRequiredFields(req,['username','password'])){
            res
                .status(401)
                .json({error:"Usuario o contraseña incorrectos"})
                .send();
            return;
        }

        let username = req.body.username;
        let password = req.body.password;

        let u = await user.findOne({
            where: {
                name: username
            }
        })

        if(u == undefined){
            res
                .status(401)
                .json({error:"Usuario o contraseña incorrectos"})
                .send();
            return;
        }

        if(!bcrypt.compareSync(password, u.password)) {
            res
                .status(401)
                .json({error:"Usuario o contraseña incorrectos"})
                .send();
            return;
        }

        res
            .status(200)
            .json({token: jwt.sign({user_id: u.id}, privateKey)})
            .send();
    } catch(e) {
        res.status(500).send();
    }

    res.status(200).send();
}

const register = async (req, res) => {
    try{
        if(!validateRequiredFields(req,['username','password'])){
            res
                .status(401)
                .json({error:"Usuario o contraseña incorrectos"})
                .send();
            return;
        }

        let name = req.body.username

        let u = await user.findOne({
            where: {
                name: name
            }
        })

        if(u != undefined){
            res
                .status(200)
                .json({error:"Nombre de usuario no disponible"})
                .send();
            return;
        }

        let password = req.body.password

        user.create({
            name: name,
            password: password 
        })

        res.status(201).send()
    }catch (e){
        console.log(e)
        res.status(500).send();
    }
}

const verify = async (req, res) => {
    if(!validateRequiredFields(req,['token'])){
        res.status(401).send();
        return;
    }

    try{
        jwt.verify(req.body.token, privateKey);
        res.status(200).send();
    }catch(err){
        res.status(401).send();
        return;
    }
}

const currentUser = async (req, res) => {
    res.json({user: "El pepe"});
    try{
        jwt.verify(req.body.token, privateKey);
        res.status(200).send();
    }catch(err){
        res.status(401).send();
    }
}

module.exports = {login, register, verify, currentUser}