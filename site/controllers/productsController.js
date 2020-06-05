const fs = require('fs');
const path = require('path');
const productosData = require ('../models/products');


const controller = {
    root:function (req,res,next){
        
        let listaProductos= productosData.findAll();
        res.render('home', { listaProductos:listaProductos });
       
    },

    productsPorCategoria:function (req,res,next){
        
        let listaProductos= productosData.FilterPorCategoria(req.params.idCat);
        res.render('home', { listaProductos:listaProductos });
       
    },

	detail:function (req,res,next){
     
		let producto = productosData.findByPK(req.params.id);
        res.render('products/product_detail', { producto: producto});
	   
    },
    rootCarga:function (req,res,next){

        console.log("CARGA PRODUCTO");
        res.render('products/product_carga', { producto: undefined});
	   
    },
    productEdicion:function (req,res,next){
        console.log("EDICION  PRODUCTO");
        let producto = productosData.findByPK(req.params.id);
        res.render('products/product_carga', { producto: producto});
	   
    },
    update:function (req,res,next){
        let producto= {
            id:req.params.id,
            name:req.body.name,
            description: req.body.description,
            image:req.body.image,
            price:req.body.price,
            category:req.body.category,
            duration:req.body.duration
        };
        productosData.update(producto);
            res.redirect('/');
    },

    create:function (req,res,next){
		let producto= {
            name:req.body.name,
            description: req.body.description,
            image:req.body.image,
            price:req.body.price,
            category:req.body.category,
            duration:req.body.duration
        };
        productosData.create(producto);
        res.redirect('/');
	   
    },
    delete:function (req,res,next){
        productosData.delete(req.params.id); 
        res.redirect('/');
	   
    }

}
module.exports = controller; 