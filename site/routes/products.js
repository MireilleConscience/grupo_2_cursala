const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const adminMdw = require('../middlewares/admin');
const validacionProductMdw = require('../middlewares/validation/product');



const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'public/images/products');
    },
    filename : (req, file, cb) => {
       return cb(null, file.originalname);
    }, 
});

/*const upload = multer({storage: storage, fileFilter(req, file, cb){
    //Valider el file comme tu veux, c'est juste un exemple
    if(file.mimetype === 'image/png') {
        return cb(null, true);
    }
    cb(null, false);
}});*/


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




const controller = require('../controllers/productsController')

/* GET listado de productos. */
router.get('/', controller.root);

/* GET listado de productos por categoria. */
router.get('/filtre:idCat', controller.productsPorCategoria);
/* GET buscador de producto */
router.get('/find', controller.productsPorName);


/* GET formulario de creacion de producto . */
router.get('/create',adminMdw, controller.rootCarga);

/* GET detaille de producto . */
router.get('/:id', controller.detail);

/* POST creacion de producto . */
router.post('/', upload.single('image'), validacionProductMdw, controller.create);

/* GET edicion de producto . */
router.get('/:id/edit', adminMdw, controller.productEdicion);

/* PUT edicion de producto . */
//router.put('/:id', controller.update);
router.put('/:id',upload.single('image'),validacionProductMdw, controller.update);


/* DELETE de producto . */
router.delete('/:id', controller.delete);




module.exports = router;
