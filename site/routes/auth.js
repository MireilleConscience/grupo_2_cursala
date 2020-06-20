var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const userMdw = require('../middlewares/user');
const guestMdw = require('../middlewares/guest');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, '../public/images/users');
    },
    filename : (req, file, cb) => {
       return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }, 
});



const upload = multer({storage: storage, fileFilter(req, file, cb){
    //Valider el file comme tu veux, c'est juste un exemple
    if(file.mimetype === 'image/png') {
        return cb(null, true);
    }
    cb(null, false);
}});



const controller = require('../controllers/authController');

/* user  formulario de registro. */
router.get('/registro',userMdw, controller.rootRegistro);

/* registro de un user. */
router.post('/', upload.single('avatar') /*, [
    check('title').isLength({min:2}),
    check('rating').isNumeric(),
    //falta validar que no sea una imagen y lanzar el error
]*/, controller.create);

/* user login . */
router.get('/login',userMdw, controller.formLogin);
router.post('/login', controller.login);

/* user perfil . */
router.get('/perfil',guestMdw, controller.formPerfil);
router.put('/perfil', upload.single('avatar'), controller.perfil);

/* user carrito . */
router.get('/carrito', controller.carrito);

module.exports = router;
