'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    tipo: {
        type: String,
        required: true,
        trim: true,
        enum: ['Física', 'Jurídica'],
        default: 'Física'
    },
    inscricaoFederal: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Pessoa', schema);