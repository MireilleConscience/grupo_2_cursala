const express = require('express');
const router = express.Router();

const controller = require('../../controllers/api/usersController');

/******************************************* ROUTER API USERS ******************/


/* suprimir producto del carrito . */
router.delete('/:id', controller.delete);



/* Lista de los usuarios . */
router.get('/', controller.listUsers);

/* Lista de los usuarios . */
router.get('/:id', controller.detalleUser);


module.exports = router;
