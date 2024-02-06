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
            res.status(401).send();
            return;
        }

        username = req.body.username;
        password = req.body.password;

        let u = await user.findOne({
            where: {
                name: username
            }
        })

        if(u == undefined){
            res.status(401).send();
            return;
        }

        if(!bcrypt.compareSync(password, u.password)) {
            res.status(401).send();
            return;
        }

        res.cookie("token", jwt.sign({user_id: u.id}, privateKey))

        res.status(200).send();
    } catch(e) {
        console.log(e)
        res.status(500).send();
    }

    res.status(200).send();
}

const register = async (req, res) => {
    try{

        console.log(req.body)

        if(!validateRequiredFields(req,['username','password'])){
            res.status(401).send();
            return;
        }

        let name = req.body.username
        let password = req.body.password

        user.create({
            name: name,
            password: password 
        })

        res.status(200).send(user.name)
    }catch{
        res.status(500).send();
    }
}

const verify = async (req, res) => {
    let token = req.cookies.token
    try{
        let decoded = jwt.verify(token, privateKey);
        console.log(decoded)
        res.status(200).send();
    }catch(err){
        res.status(401).send();
        return;
    }
}

module.exports = {login, register, verify}