const jwt = require('jsonwebtoken') ;

const payload = {
    userId: '52'
    // on pourrait ajouter d'autres informations non 'volatiles'
}
const SECRET_KEY = 'cq5xGLvcuSmMRtOmOC9uAGLetyNMkP0sakVCwwc3J2PuvIUbSOxap6gd4L4CO3b' ;
const options = {
    expiresIn: '24h', // on peut utiliser 's', 'h', 'd', ou pas d'unité pour les ms
    algorithm : 'HS256', //  HS256 est la valeur par défaut
    role : 'member'// ... il existe d'autre options possibles (cf. lien ci-dessous)
}
const token = jwt.sign(payload, SECRET_KEY, options); // création du token

console.log(token);
