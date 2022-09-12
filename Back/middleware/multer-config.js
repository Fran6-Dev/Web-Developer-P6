// Package des gestion de fichier entrants
const multer = require('multer');

// Dictionnaire permettant de gérer les extensions
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Configure le chemin et noms pour les fichiers entrants
const storage = multer.diskStorage({
    destination: ( req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);

    }
});

module.exports = multer({ storage }).single('image');