'use strict';

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.authenticate = async(data) => {
    const res = await Usuario.findOne({
        email: data.email,
        password: data.password

    });
    return res;
}