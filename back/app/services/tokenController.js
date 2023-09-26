const jwt = require('jsonwebtoken') ;
require("dotenv").config();

const tokenController = {

    createToken :(userID, role = 'member') => {
        const payload = {
            userId: userID,
            role : role
            // on pourrait ajouter d'autres informations non 'volatiles'
        }
        const SECRET_KEY = process.env.SECRET_KEY;
        const options = {
            expiresIn: '24h', // on peut utiliser 's', 'h', 'd', ou pas d'unité pour les ms
            algorithm : 'HS256', //  HS256 est la valeur par défaut
            // ... il existe d'autre options possibles (cf. lien ci-dessous)
        }
        const token = jwt.sign(payload, SECRET_KEY, options);
        return token; // Création du token
        
        
    }
};

module.exports = tokenController;