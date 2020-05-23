const {Router}= require('express');
const router = Router();
const products = require('../products.json');
const _ = require('underscore');

router.get('/products', (req,res)=>{
    res.json(products);
});

router.get('/products/create', (req,res)=>{
    res.json(products);
});

router.get('/products/:id', (req,res)=>{
    res.json(products);
});

router.post('/products', (req, res) => {
    const id = products.length + 1;
    const { name, description, image, category, price } = req.body;
    const newProduct = { id, ...req.body };
    if (id && name && description && image && category && price) {
        products.push(newProduct);
        res.json(products);
    } else {
        res.status(500).json({error: 'Hubo un problema, vuelve a intentarlo.'});
    }
});

router.get('/products/:id/edit', (req, res)=>{
    res.json(products);
})

router.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, image, category, price } = req.body;
    if (id && name && description && image && category && price) {
        _.each(products, (product, i) => {
            if(product.id === id) {
                product.name = name;
                product.description = description;
                product.image = image;
                product.category = category;
                product.price = price;
            }
        });
        res.json(products);
    } else {
        res.status(500).json({error: 'Hubo un problema, vuelve a intentarlo.'});
    }
});

router.delete('/products/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(products, (product, i) => {
            if (product.id == id) {
                products.splice(i, 1);
            }
        });
        res.json(products);
    }
});

module.exports= router;