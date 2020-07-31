const express = require('express');
const router = express.Router();

const controller = require('../../controllers/api/usersController');

/******************************************* ROUTER API USERS ******************/


/* suprimir producto del carrito . */
router.delete('/:id', controller.delete);





module.exports = router;
