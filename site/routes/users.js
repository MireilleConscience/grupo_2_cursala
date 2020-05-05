var express = require('express');
var router = express.Router();

const controller = require('../controllers/usersController');

/* user registro . */
router.get('/registro', controller.registro);
/* user carrito . */
router.get('/carrito', controller.carrito);

module.exports = router;
