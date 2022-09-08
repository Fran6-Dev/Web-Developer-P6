// Permet le hachage du mot de passe
const bcrypt = require('bcrypt');
// Permet de créer des tokens d'authentification qui permettent de se connecter une seule fois à leur compte
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Création de la requête et réponse correspondant à la création d'un utilisateur
exports.signup = (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  };

// Ceci est un test qui fonctionne lorsque que l'on utilise la methode post


// Création de la requête et réponse correspondant à la connexion d'un utilisateur
exports.login = (req, res, next) => {
    User.findOne({email : req.body.email})
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'Paire identifiant / mot de passe incorrecte.'});
            } else {
                bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        res.status(401).json({ message : 'Paire identifiant / mot de passe incorrecte.'});
                    } else {
                        res.status(200).json({
                            userId: user_id,
                            token: jwt.sign(
                                // Création du token
                                { userId: user._id },
                                'RANDOM_TOKEN_SECRET',
                                { expireIn: '24h' }
                            )
                        });
                    }
                })
                .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }));
};

