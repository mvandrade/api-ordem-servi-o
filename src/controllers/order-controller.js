'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.get = async(req, res, next) => {
    try{
        var data = await repository.get();
        res.status(200).send({data});
    } catch(e) {
        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
}

exports.post = async(req, res, next) => {
//     let contract = new ValidationContract();
//     contract.isRequired(req.body.name, 'Preenchimento obrigatório do nome');
//     contract.hasMinLen(req.body.name,3, 'Nome deve conter no mínimo 3 caracteres');
//     contract.hasMaxLen(req.body.name,50, 'Título deve conter no máximo 50 caracteres');
//     contract.isRequired(req.body.email, 'Preenchimento obrigatório do e-mail');
//     contract.isEmail(req.body.email, 'E-mail informado inválido.')
//     contract.isRequired(req.body.password, 'Preenchimento obrigatório da senha');
//     contract.hasMinLen(req.body.password,3, 'Senha deve conter no mínimo 3 caracteres');
//     contract.hasMaxLen(req.body.password,100, 'Senha deve conter no máximo 100 caracteres');

//     //Quando haver inconsistências
//     if (!contract.isValid()) {
//         res.status(400).send(contract.errors()).end();
//         return;
//     }

    try {
        await repository.create({
            usuario: req.body.usuario,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({ message: 'Pedido cadastrado com sucesso'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
};

exports.put = async(req, res, next) => {
    // let contract = new ValidationContract();
    // contract.isRequired(req.body.name, 'Preenchimento obrigatório do nome.');
    // contract.hasMinLen(req.body.name,3, 'Nome deve conter no mínimo 3 caracteres.');
    // contract.hasMaxLen(req.body.name,50, 'Título deve conter no máximo 50 caracteres.');
    // contract.isRequired(req.body.email, 'Preenchimento obrigatório do e-mail.');
    // contract.isEmail(req.body.email, 'E-mail informado inválido.')
    // contract.isRequired(req.body.password, 'Preenchimento obrigatório da senha.');
    // contract.hasMinLen(req.body.password,3, 'Senha deve conter no mínimo 3 caracteres.');
    // contract.hasMaxLen(req.body.password,100, 'Senha deve conter no máximo 100 caracteres.');

    // //Quando haver inconsistências
    // if (!contract.isValid()) {
    //     res.status(400).send(contract.errors()).end();
    //     return;
    // }

    try {
        await repository.update(req.params.id, req.body )
        res.status(201).send({ message: 'Pedido atualizado com sucesso'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({ message: 'Pedido removido com sucesso'});
    } catch(e) {
        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
};