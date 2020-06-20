const fs = require('fs');
const path = require('path');
const productosData = require ('../models/products');
const db = require('./../database/models');

const {Op} = require('sequelize');

const controller = {

    root:function (req,res,next){
        db.Curso.findAll()
        .then(function(listaProductos){
            res.render('home', { listaProductos:listaProductos });
        });
       
    },

    productsPorCategoria:function (req,res,next){
        db.Curso.findAll({
            where:{
                categoryId: req.params.idCat
            }
        })
        .then(function(listaProductos){
            res.render('home', { listaProductos:listaProductos });
        });
       
    },
    productsPorName:function (req,res,next){
        db.Curso.findAll({
            where:{
                name:{[Op.like] :  '%' + req.query.busqueda + '%'}
            },
            order : [
                ['name','ASC'],
            ]
        })
        .then(function(listaProductos){
            res.render('home', { listaProductos:listaProductos });
        });
        //let listaProductos= productosData.FilterPorCategoria(req.params.idCat);
       // res.render('home', { listaProductos:listaProductos });
       
    },

	detail:function (req,res,next){
     
       // let producto = productosData.findByPK(req.params.id);
        db.Curso.findByPk(req.params.id)
        .then(function(producto){
         
           db.Category.findAll()
              .then(function(categorias){
                res.render('products/product_detail', { producto: producto});
            });
        
          });
       
	   
    },
    rootCarga:function (req,res,next){

       // console.log("CARGA PRODUCTO");
        db.Category.findAll()
             .then(function(categorias){
                res.render('products/product_carga', { categorias: categorias});
           });
       // let categorias = productosData.findAllCat();
	   
    },
    productEdicion:function (req,res,next){
        console.log("EDICION  PRODUCTO");
        //let producto = productosData.findByPK(req.params.id);
       // let categorias = productosData.findAllCat();
       db.Curso.findByPk(req.params.id)
       .then(function(producto){
        
          db.Category.findAll()
             .then(function(categorias){
                res.render('products/product_edicion', { producto: producto,categorias: categorias });
           });
       
         });
    },
    update:function (req,res,next){
        //WINDOWS
        let image= req.file == undefined ? '' : req.file.path.replace('..\\public\\', '\\') ;
        // LINUX Y MAC
        image= req.file == undefined ? '' : image.replace('../public/', '/') ;
        
        let producto= {
            id:req.params.id,
            name:req.body.name,
            description: req.body.description,
            //image: req.file == undefined ? '' : req.file.filename , 
            image: image,
            price:req.body.price,
            categoryId:req.body.category, /** OJO era category antes  */
            length:req.body.length
        };
       // productosData.update(producto);
           // res.redirect('/');

        db.Curso.update(
            producto,{
                where:{
                    id: req.params.id
                }
            }
            ).then(function(){
              res.redirect('/');
        });
    },

    create:function (req,res,next){
        //WINDOWS
        let image= req.file == undefined ? '' : req.file.path.replace('..\\public\\', '\\') ;
        // LINUX Y MAC
        image= req.file == undefined ? '' : image.replace('../public/', '/') ;
      
		let producto= {
            name:req.body.name,
            description: req.body.description,
            //image: req.file == undefined ? '' : req.file.filename, 
            image: image ,
            price:req.body.price,
            categoryId:req.body.categoryId,
            length:req.body.length
        };

      
        console.log(producto);
        db.Curso.create(producto).then(function(){
            res.redirect('/');
        });
        //productosData.create(producto);
       // res.redirect('/');
	   
    },
    delete:function (req,res,next){
        productosData.delete(req.params.id); 
        res.redirect('/');
	   
    }

}
module.exports = controller; 