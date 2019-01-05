'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/auth-repository');
const authService = require('../services/auth-service');
const md5 = require('md5');

exports.authenticate = async(req, res, next) => {

    try {
        const usuario = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!usuario) {
            res.status(404).send({
                message: 'Usuário ou Senha invalidos'
            })
            return;
        }

        // console.error( 'Foi recuperado o usuario ' + usuario + 'email ' + req.body.email + ' password ' + req.body.password);

        const token = await authService.generateToken ({
            email: usuario.email,
            nome: usuario.nome
        });

        res.status(201).send({
            token: token,
            data: {
                email: usuario.email,
                nome: usuario.nome
            }
        });
    } catch(e) {

        console.log(e);

        res.status(500).send({
            message: 'Falha no processamento da requisição'
        });
    }
};