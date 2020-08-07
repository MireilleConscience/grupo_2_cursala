const express = require('express');
const router = express.Router();



const controller = require('../../controllers/api/productsController')

/* GET listado de productos. */
router.get('/', controller.list);


/* GET detaille de producto . */
router.get('/:id', controller.listOne);






module.exports = router;
