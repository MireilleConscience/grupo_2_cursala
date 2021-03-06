const {check, validationResult, body} = require('express-validator');
const db = require('../../database/models');
const bcryptjs = require('bcryptjs');
const path = require('path');

let validationRegistro = [
            check('firstName').isLength({min:2,max:50}).withMessage('Nombre invalido, al menos 2 caracteres'),
            check('email').isEmail().withMessage('Email invalido')
            .custom(function(value){
                //validar en la base de datos que no exista
                return db.User.findOne({where :{email : value}}).then(user => {
                    if (user != null){
                        return Promise.reject('Este email ya esta registrado');
                    }
                })
            }),
            check('password', 'Contraseña invalida, min 4 caractere, max 10').isLength({min:4,max:10}).bail(),
            check('password', 'Las contraseñas no coinciden')
            .custom((value, { req }) => {
                return value == req.body.c_password
            }),
            body('avatar').custom((value, { req }) => {
            if(req.file != undefined){
                const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
                const ext = path.extname(req.file.originalname)
                return acceptedExtensions.includes(ext);
            }
            return true; // el avatar es opcional, puede ser un campo vacio
            }).withMessage('Imagen no obligatoria, solo con uno de los siguientes formatos: JPG, JPEG, PNG, GIF'),
        

];

module.exports = validationRegistro;

