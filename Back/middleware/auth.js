const jwt = require('jsonwebtoken');

// Ce middleware sert à sécuriser toutes les routes lorsqu'il est appliqué
module.exports = (req, res, next) => {
   try {
    // Nous utilisons donc la fonction split pour tout récupérer après l'espace dans le header
       const token = req.headers.authorization.split(' ')[1];
    // On vérifie que le token décodé correspond au token crée précédemment
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       // On vérifie que le userId envoyé avec la requête correspond au userId encodé dans le token
       const userId = decodedToken.userId;
       if (req.body.userId && req.body.userId !== userId) {
        throw 'userId non valide.'
       } else {
        next();
       }
   } catch(error) {
       res.status(401).json({ error });
   }
};