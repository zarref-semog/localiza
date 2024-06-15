const mongoose = require('mongoose');

const Utilitario = mongoose.Schema({
    idCarro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carro',
        required: true
    },
    qtdPassageiro: {
        type: Number,
        required: true
    },
    tmBagageiro: {
        type: Number,
        required: true
    },
    kmLitro: {
        type: Number,
        required: true
    },
    melhorias: {
        type: [String],
        required: false
    }
}, {versionKey: false});

module.exports = mongoose.model('Utilitario', Utilitario);