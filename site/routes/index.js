const express = require('express');
const router = express.Router();

const controller = require('../controllers/indexController')

/* GET home page. */
router.get('/', controller.index);

/* GET landing page. */
router.get('/landing', controller.landing);

module.exports = router;

