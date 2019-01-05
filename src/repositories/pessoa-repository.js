'use strict';

const mongoose = require('mongoose');
const Pessoa = mongoose.model('Pessoa');

exports.get = async() => {
    const res = await Pessoa.find();
    return res;
}

exports.create = async(data) => {
    var pessoa = new Pessoa(data);
    const res = await pessoa.save();
    return res;
}

exports.update = async(id, data) => {
    const res = await Pessoa.findByIdAndUpdate(
        id, {
        $set: {
            nome: data.nome,
            tipo: data.tipo,
            inscricaoFederal: data.inscricaoFederal
        }
    });
    return res;
}

exports.delete = async(id) => {
    const res = await Pessoa.findByIdAndRemove(id)
    return res
}