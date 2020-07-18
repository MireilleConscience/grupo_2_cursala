const express = require('express');
const router = express.Router();

const adminMdw = require('../middlewares/admin');

const controller = require('../controllers/categorysController');


/* GET listado de productos. */
router.get('/lista', adminMdw,  controller.listaCategorias);

/* GET formulario de creacion de producto . */
router.get('/create', adminMdw, controller.formCreate);

/* POST creacion de categoria . */
router.post('/create',  controller.create);

/* GET formulario de edicion de categoria . */
router.get('/:id/edit',adminMdw, controller.formEdicion);

/* PUT update de producto . */
router.put('/:id', controller.update);

/* DELETE de producto . */
router.delete('/:id', controller.delete);




module.exports = router;
