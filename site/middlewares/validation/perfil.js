const {check, validationResult, body} = require('express-validator');
const db = require('../../database/models');
const bcryptjs = require('bcryptjs');
const path = require('path');

let validationPerfil = [
            check('firstName').isLength({min:2, max:50}).withMessage('Nombre invalido, al menos 2 caracteros'),
            body('avatar').custom((value, { req }) => {
            if(req.file != undefined){
                const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
                const ext = path.extname(req.file.originalname)
                return acceptedExtensions.includes(ext);
            }
            return true; // el avatar es opcional, puede ser un campo vacio
            }).withMessage('La imagen debe tener uno de los siguientes formatos: JPG, JPEG, PNG, GIF'),
        

];

module.exports = validationPerfil;

