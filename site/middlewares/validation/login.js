const {check, validationResult, body} = require('express-validator');
const db = require('../../database/models');
const bcryptjs = require('bcryptjs');

let validationLogin = [
    check('password').isLength({min:4})
        .withMessage('Contraseña invalida, min 4 caracteres').bail(),
    check('email').isEmail()
        .withMessage('Email Invalido')
        
        .custom((value, { req }) => {
            return db.User.findOne({where :{email : value}}).then(user => {
                if (user == null) {
                    return Promise.reject('Su email no esta registrado, registrense primero por favor');
                } else if (user && !bcryptjs.compareSync(req.body.password , user.password)) {
                    return Promise.reject('Contraseña invalida');
                }
            })
        }), 
];

module.exports = validationLogin;

