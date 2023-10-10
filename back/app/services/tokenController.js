const jwt = require('jsonwebtoken') ;
const {getOneUserById} = require('../datamappers/userDatamapper');
const userDatamapper = require('../datamappers/userDatamapper');
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

    // checkTokenLogin : async (req, res, next) => {
    //     const token = req.cookies.access_token;
    //     if(!token){
    //         return next();
    //     }

    //     try {
    //         const userData = jwt.verify(token, process.env.SECRET_KEY);
    //         req.userId = userData.id;
    //         const userConnected = await userDatamapper.getOneUserById(req.userId)
    //         res.json(userConnected);
    //         next();
    //     } catch (error) {
    //         return next(error);
    //     }
    // },
    checkTokenRemove: async (req, res, next) => {
        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.split(' ')[1];
            
            try {
                const userData = jwt.clearCookie("access_token");
                res.json({"message": "Vous avez été déconnecté" });
            } catch (error) {
                return res.status(401);
            }
          }
    }, 
    
    checkTokenMember : async (req, res, next) => {
        const authorization = req.headers.authorization;
        
        if (authorization) {
            const token = authorization.split(' ')[1];
            
            // try {
                const userData = jwt.verify(token, process.env.SECRET_KEY);
                console.log(userData);
                
                req.userId = userData.id;
                
                
                return next();
            // } catch (error) {
            //     return res.status(401).json({"message":"Connectez-vous pour pouvoir accéder à cette page"});
            // }
          }
    },
};

module.exports = tokenController;