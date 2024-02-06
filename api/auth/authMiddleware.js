const jwt = require('jsonwebtoken');

const privateKey = "ChangeMePlease!!!!"

function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        return false;
      }
    }
    return true;
}

const authMiddleware = (req, res, next) => {

    if(!validateRequiredFields(req,['token'])){
        res.status(401).send();
        return;
    }

    try{
        jwt.verify(req.body.token, privateKey);
    }catch{
        res.status(401).send();
        return;
    }

    next()
}

module.exports = authMiddleware