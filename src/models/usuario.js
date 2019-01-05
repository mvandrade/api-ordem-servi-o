'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pendente', 'Ativo', 'Suspendo', 'Ferias', 'Inativo'],
        default: 'Pendente'
    }
});

module.exports = mongoose.model('Usuario', schema);