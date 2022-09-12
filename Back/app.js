const express = require('express');
// Permet d'extraire l'objet JSON des requêtes POST
const bodyParser = require ('body-parser');
// Permet d'utiliser la base de donnée mongoose
const mongoose = require('mongoose');
// Donne accès au chemin de notre système de fichier
const path = require('path');

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

const app = express();

// Gestion de la connexion à la base de données mongoose
mongoose.connect('mongodb+srv://Francisp6:basket45@cluster0.ikbd5jk.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// Extrait le corps JSON afin de gérer les requêtes post    
app.use(express.json());

// Corrige les erreurs de CORS qui par défaut, bloaque les appels HTTP entre des serveurs différents, ce qui empêche les requêtes malveillantes d'accéder à des ressources sensibles.

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);



module.exports = app;