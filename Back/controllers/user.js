// Permet le hachage du mot de passe
const bcrypt = require('bcrypt');
// Permet de créer des tokens d'authentification qui permettent de se connecter une seule fois à leur compte
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Création de la requête et réponse correspondant à la création d'un utilisateur
exports.signup = (req, res, next) => {
    // Le 10 correspond au nombre de fois que l'on execute l'algorithme de hachage
    // console.log(req);
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User ({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(() => res.status(201).json({ message : 'Utilisateur crée !'}))
            .catch(error => {
                console.log(error);
                res.status(400).json({ error });
            });
    })
    .catch( error => {
        res.status(500).json({ error })
    } );
};

// Ceci est un test qui fonctionne lorsque que l'on utilise la methode post


// Création de la requête et réponse correspondant à la connexion d'un utilisateur
exports.login = (req, res, next) => {
    User.findOne({email : req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire identifiant / mot de passe incorrecte.'});
            }
                bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ message : 'Paire identifiant / mot de passe incorrecte.'});
                    }
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign(
                                // Création du token
                                { userId: user._id },
                                'RANDOM_TOKEN_SECRET',
                                { expiresIn: '24h' },
                            )
                        });
                })
                .catch(error => res.status(500).json({ error : 'Erreur authentification' }))
            })
        .catch(error => res.status(500).json({ error : 'Erreur utilisateur'}));
};
