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
        enum: ['Pendente', 'Ativo', 'Suspendo', 'Inativo'],
        default: 'Pendente'
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        required: true,
        default: Date.now
    },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Usuario', schema);