const jwt = require('jsonwebtoken') ;
const {getOneUserById} = require('../datamappers/userDatamapper')
require("dotenv").config();

const tokenController = {

    createToken :(id, role = 'member') => {
        const payload = {
            id,
            role
        }
        const SECRET_KEY = process.env.SECRET_KEY;
        const options = {
            expiresIn: '24h',
            algorithm : 'HS256',
        }
        const token = jwt.sign(payload, SECRET_KEY, options);
        return token;
    },

    checkTokenLogin : async (req, res, next) => {
        const token = req.cookies.access_token;
        if(!token){
            return next();
        }

        try {
            const userData = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = userData.id;
            return next();
        } catch (error) {
            return next(error);
        }
    },

    checkTokenMember : async (req, res, next) => {
        const token = req.cookies.access_token;
        if(!token){
            return res.status(401).json({"message":"Connectez-vous pour pouvoir accéder à cette page"});
        }

        try {
            const userData = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = userData.id;
            return next();
        } catch (error) {
            return res.status(401).json({"message":"Connectez-vous pour pouvoir accéder à cette page"});
        }
    },
};

module.exports = tokenController;