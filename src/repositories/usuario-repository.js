'use strict';

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.get = async() => {
    const res = await Usuario.find();
    return res;
}

exports.create = async(data) => {
    var usuario = new Usuario(data);
    const res = await usuario.save();
    return res;
}

exports.update = async(id, data) => {
    const res = await Usuario.findByIdAndUpdate(
        id, {
        $set: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    });
    return res;
}

exports.delete = async(id) => {
    const res = await Usuario.findByIdAndRemove(id)
    return res
}