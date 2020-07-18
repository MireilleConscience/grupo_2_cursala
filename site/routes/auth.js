var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const userMdw = require('../middlewares/user');
const guestMdw = require('../middlewares/guest');
const validacionLoginMdw = require('../middlewares/validation/login');
const validacionRegistroMdw = require('../middlewares/validation/registro');
const validacionPerfilMdw = require('../middlewares/validation/perfil');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'public/images/users');
    },
    filename : (req, file, cb) => {
       return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }, 
});



const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const ext = path.extname(file.originalname);
        if (acceptedExtensions.includes(ext)){
            //si es correcto subo la imagen
            cb(null, true);
            //
        } else {
            //aqui guardo la imagen en el body
            req.file = file;
            //le digo que no la suba
            cb(null, false);
        }
     }
});




const controller = require('../controllers/authController');

/************ANTES DE ACCEDER AL CARRITO SI USER NO LOGGEADO *****************/
router.get('/stop',userMdw, controller.stop);


/* user  formulario de registro. */
router.get('/registro',userMdw, controller.rootRegistro);

/* registro de un user. */
router.post('/registro', upload.single('avatar'), validacionRegistroMdw, controller.create);
//router.post('/registro', upload.single('avatar'), controller.create);

/* user login . */
router.get('/login',userMdw, controller.formLogin);
router.post('/login',validacionLoginMdw, controller.login);

/* user logout . */
router.get('/logout', controller.logout);

//router.post('/login', controller.login);

/* user perfil . */
router.get('/perfil',guestMdw, controller.formPerfil);
router.put('/perfil', upload.single('avatar'),validacionPerfilMdw, controller.perfil);

/* user carrito . */
//router.get('/carrito', controller.carrito);



module.exports = router;
