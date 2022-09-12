const mongoose = require('mongoose');
// Schema permet de créer un schéma de données pour la base de données MongoDB
const saucesSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mainPepper: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    heat: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
    },
    dislikes: {
        type: Number,
    },
    usersLiked: {
        type: [String],
    },
    usersDisliked: {
        type: [String],
    },
})
// Model transfome ce modèle en un modèle utilisable
module.exports = mongoose.model('Sauces', saucesSchema);