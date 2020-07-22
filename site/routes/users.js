const express = require('express');
const router = express.Router();

const guestMdw = require('../middlewares/guest');

const controller = require('../controllers/usersController');


/* GET contenido del carrito. */
/* user carrito . */
router.get('/editCarrito', guestMdw, controller.edit);

//router.get('/edit',guestMdw,  controller.edit);

/* POST agregar un producto en el carrito . */
router.post('/addCarrito:id', guestMdw, controller.add);

/* PUT modificar la cantidad de producto en el carrito . */
router.put('/:id', controller.update);

/* suprimir producto del carrito . */
router.delete('/:id', controller.delete);


/* POST validar el carrito . */
router.post('/validar', guestMdw, controller.validar);




module.exports = router;
