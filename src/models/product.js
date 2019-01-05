'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        index: true,
        unique: true
    },
    description: {
        type: String,
          trim: true
    },
    price: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: true
    },
    tags: [{
        type: String,
    }]
});

module.exports = mongoose.model('Product', schema);