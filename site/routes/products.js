const express = require('express');
const router = express.Router();

const controller = require('../controllers/productsController')

/* GET listado de productos. */
router.get('/', controller.root);

/* GET listado de productos por categoria. */
router.get('/filtre:idCat', controller.productsPorCategoria);


/* GET formulario de creacion de producto . */
router.get('/create', controller.rootCarga);

/* GET detaille de producto . */
router.get('/:id', controller.detail);

/* POST creacion de producto . */
router.post('/', controller.create);

/* GET edicion de producto . */
router.get('/:id/edit', controller.productEdicion);

/* PUT edicion de producto . */
router.put('/:id', controller.update);

/* DELETE edicion de producto . */
router.delete('/:id', controller.delete);




module.exports = router;
