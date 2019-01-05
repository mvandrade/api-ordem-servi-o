'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

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

exports.getBySlug = async(req, res, next) => {
    try{
        var data = await repository.getBySlug(req.params.slug)
        res.status(200).send({data});
    } catch(e) {
        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
}

exports.getById = async(req, res, next) => {
    try{
        var data = await repository.getById(req.params.id)
        res.status(200).send({ data});
    } catch(e) {
        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
}

exports.getByTag = async(req, res, next) => {
    try{
        var data = await repository.getByTag(req.params.tag)
        res.status(200).send({ data});
    } catch(e) {
        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
};

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.isRequired(req.body.title, 'Obrigatório o preenchimento do título');
    contract.hasMinLen(req.body.title,3, 'Título deve conter no mínimo 3 caracteres');
    contract.hasMaxLen(req.body.title,50, 'Título deve conter no máximo 50 caracteres');
    contract.isRequired(req.body.slug, 'Obrigatório o preenchimento do slug');
    contract.hasMinLen(req.body.slug,3, 'Slug deve conter no mínimo 3 caracteres');
    contract.hasMaxLen(req.body.slug,100, 'Slug deve conter no máximo 100 caracteres');
    contract.isRequired(req.body.description, 'Obrigatório o preenchimento da descrição');
    contract.hasMinLen(req.body.description,3, 'Descrição deve conter no mínimo 3 caracteres');
    contract.hasMaxLen(req.body.description,100, 'Descrição deve conter no máximo 100 caracteres');
    contract.isRequired(req.body.price, 'Obrigatório o preenchimento do preço');
    contract.isNumber(req.body.price, 'Preencimento de preço com numeros');

    //Quando haver inconsistências
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create(req.body)
        res.status(201).send({ message: 'Produto cadastrado com sucesso'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
};

exports.put = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.isRequired(req.body.title, 'Obrigatório o preenchimento do título');
    contract.hasMinLen(req.body.title,3, 'Título deve conter no mínimo 3 caracteres');
    contract.hasMaxLen(req.body.title,50, 'Título deve conter no máximo 50 caracteres');
    contract.isRequired(req.body.slug, 'Obrigatório o preenchimento do slug');
    contract.hasMinLen(req.body.slug,3, 'Slug deve conter no mínimo 3 caracteres');
    contract.hasMaxLen(req.body.slug,100, 'Slug deve conter no máximo 100 caracteres');
    contract.isRequired(req.body.description, 'Obrigatório o preenchimento da descrição');
    contract.hasMinLen(req.body.description,3, 'Descrição deve conter no mínimo 3 caracteres');
    contract.hasMaxLen(req.body.description,100, 'Descrição deve conter no máximo 100 caracteres');
    contract.isRequired(req.body.price, 'Obrigatório o preenchimento do preço');
    contract.isNumber(req.body.price, 'Preencimento de preço com numeros');

    //Quando haver inconsistências
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.update(req.params.id, req.body )
        res.status(200).send({ message: 'Produto atualizado com sucesso'});
    } catch(e) {
        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({ message: 'Produto removido com sucesso'});
    } catch(e) {
        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
};