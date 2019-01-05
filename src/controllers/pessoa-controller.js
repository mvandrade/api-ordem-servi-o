'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/pessoa-repository');

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
    contract.hasMaxLen(req.body.nome,100, 'Nome deve conter no máximo 100 caracteres');
    contract.isRequired(req.body.tipo, 'Preenchimento obrigatório do tipo de pessoa');
    contract.isRequired(req.body.inscricaoFederal, 'Preenchimento obrigatório do tipo de pessoa');
    contract.isValidIncricaoFederal(req.body.inscricaoFederal, req.body.tipo, 'Inscrição Federal inválida.')

    //Quando haver inconsistências
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create({
            nome: req.body.nome,
            tipo: req.body.tipo,
            inscricaoFederal: req.body.inscricaoFederal
        })
        res.status(201).send({ message: 'Cliente cadastrado com sucesso'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
};

exports.put = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.isRequired(req.body.nome, 'Preenchimento obrigatório do nome');
    contract.hasMinLen(req.body.nome,3, 'Nome deve conter no mínimo 3 caracteres');
    contract.hasMaxLen(req.body.nome,100, 'Nome deve conter no máximo 100 caracteres');
    contract.isRequired(req.body.tipo, 'Preenchimento obrigatório do tipo de pessoa');
    contract.isRequired(req.body.inscricaoFederal, 'Preenchimento obrigatório do tipo de pessoa');
    contract.isValidIncricaoFederal(req.body.inscricaoFederal, req.body.tipo, 'Inscrição Federal inválida.')
    //Quando haver inconsistências
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.update(req.params.id, req.body )
        res.status(201).send({ message: 'Cliente atualizado com sucesso'
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
        res.status(200).send({ message: 'Cliente removido com sucesso'});
    } catch(e) {
        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
};