'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/usuario-repository');
const md5 = require('md5');

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
    let contract = new ValidationContract();
    contract.isRequired(req.body.nome, 'Preenchimento obrigatório do nome');
    contract.hasMinLen(req.body.nome,3, 'Nome deve conter no mínimo 3 caracteres');
    contract.hasMaxLen(req.body.nome,50, 'Título deve conter no máximo 50 caracteres');
    contract.isRequired(req.body.email, 'Preenchimento obrigatório do e-mail');
    contract.isEmail(req.body.email, 'E-mail informado inválido.')
    contract.isRequired(req.body.password, 'Preenchimento obrigatório da senha');
    contract.hasMinLen(req.body.password,3, 'Senha deve conter no mínimo 3 caracteres');
    contract.hasMaxLen(req.body.password,100, 'Senha deve conter no máximo 100 caracteres');

    //Quando haver inconsistências
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create({
            nome: req.body.nome,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })
        res.status(201).send({ message: 'Usuário cadastrado com sucesso'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
};

exports.put = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.isRequired(req.body.name, 'Preenchimento obrigatório do nome.');
    contract.hasMinLen(req.body.name,3, 'Nome deve conter no mínimo 3 caracteres.');
    contract.hasMaxLen(req.body.name,50, 'Título deve conter no máximo 50 caracteres.');
    contract.isRequired(req.body.email, 'Preenchimento obrigatório do e-mail.');
    contract.isEmail(req.body.email, 'E-mail informado inválido.')
    contract.isRequired(req.body.password, 'Preenchimento obrigatório da senha.');
    contract.hasMinLen(req.body.password,3, 'Senha deve conter no mínimo 3 caracteres.');
    contract.hasMaxLen(req.body.password,100, 'Senha deve conter no máximo 100 caracteres.');

    //Quando haver inconsistências
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.update(req.params.id, req.body )
        res.status(201).send({ message: 'Usuário atualizado com sucesso'
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
        res.status(200).send({ message: 'Usuário removido com sucesso'});
    } catch(e) {
        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
};