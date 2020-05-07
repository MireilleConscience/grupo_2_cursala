const express = require('express');
const router = express.Router();

const controller = require('../controllers/productsController')

/* GET detaille de producto page. */
router.get('/detail', controller.detail);

/* GET carga de producto page. */
router.get('/carga', controller.create);

module.exports = router;
