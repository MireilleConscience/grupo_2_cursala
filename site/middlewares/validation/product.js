const {check, validationResult, body} = require('express-validator');
const db = require('../../database/models');
const bcryptjs = require('bcryptjs');
const path = require('path');

let validationProducto = [
            check('name').isLength({min:5, max: 50}).withMessage('Nombre invalido, al menos 5 caracteres'),
            check('description').isLength({min:20, max: 250}).withMessage('Descripcion invalida, al menos 20 caracteres'),
            check('categoryId').isNumeric().withMessage('Debe elegir una categoria'),
            check('price').isNumeric().withMessage('Precio invalido, debe ser un numero '),
            check('length').isNumeric().withMessage('Carga horaria invalida, debe ser un numero '),
           
            body('image').custom((value, { req }) => {
            if(req.file != undefined){
                const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
                const ext = path.extname(req.file.originalname)
                return acceptedExtensions.includes(ext);
            }
            return true; // la imagen de producto es opcional, puede ser un campo vacio
            }).withMessage('Imagen no obligatoria, solo con uno de los siguientes formatos: JPG, JPEG, PNG, GIF'),
        

];

module.exports = validationProducto;

