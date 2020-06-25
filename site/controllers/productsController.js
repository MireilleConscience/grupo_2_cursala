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
        })
        .catch(function(error){
            console.log(error);
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
        })
        .catch(function(error){
            console.log(error);
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
            
               return  res.render('home', { listaProductos:listaProductos });
            
                
        })
        .catch(function(error){
            console.log(error);
        });
        //let listaProductos= productosData.FilterPorCategoria(req.params.idCat);
       // res.render('home', { listaProductos:listaProductos });
       
    },

	detail:function (req,res,next){
     
       // let producto = productosData.findByPK(req.params.id);
       let pedidoProducto= db.Curso.findByPk(req.params.id);
       let pedidoCategory = db.Category.findAll();

       Promise.all([pedidoProducto,pedidoCategory])
       .then(function([producto,category]){
                if(producto){
                    res.render('products/product_detail', { producto: producto, category:category});
                }else{
                    res.redirect('/');
                }
                
        })
        .catch(function(error){
            console.log(error);
        });
      
    },

    rootCarga:function (req,res,next){

       // console.log("CARGA PRODUCTO");
        db.Category.findAll()
             .then(function(categorias){
                res.render('products/product_carga', { categorias: categorias});
           })
           .catch(function(error){
            console.log(error);
        });
       // let categorias = productosData.findAllCat();
	   
    },
    productEdicion:function (req,res,next){
        console.log("EDICION  PRODUCTO");
        //let producto = productosData.findByPK(req.params.id);
       // let categorias = productosData.findAllCat();
       let pedidoProducto=db.Curso.findByPk(req.params.id);
       let pedidoCategoria= db.Category.findAll();
       Promise.all([pedidoProducto,pedidoCategoria])
             .then(function([producto,categorias]){
                if(producto){
                    res.render('products/product_edicion', { producto: producto,categorias: categorias });
                }else{
                    res.redirect('/');
                }
               
           })
        .catch(function(error){
            console.log(error);
        });
    },
    update:function (req,res,next){
        //WINDOWS
        let image= req.file == undefined ? '' : req.file.path.replace('..\\public\\', '\\') ;
        // LINUX Y MAC
        image= req.file == undefined ? '' : image.replace('../public/', '/') ;
        let producto;
        if(req.file){
            //WINDOWS
           image = req.file.path.replace('..\\public\\', '\\') ;
            // LINUX Y MAC
           image = image.replace('../public/', '/') ;
            
           producto= {
            name:req.body.name,
            description: req.body.description,
            image: image,
            price:req.body.price,
            categoryId:req.body.category, /** OJO era category antes  */
            length:req.body.length
             };
       }else{
            producto= {
             name:req.body.name,
             description: req.body.description,
             price:req.body.price,
             categoryId:req.body.category, /** OJO era category antes  */
             length:req.body.length
            };
       // productosData.update(producto);
           // res.redirect('/');
        }
        db.Curso.update(
            producto,{
                where:{
                    id: req.params.id
                }
            }
        ).then(function(){
              res.redirect('/');
        }) .catch(function(error){
            console.log(error);
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
        db.Curso.create(producto)
        .then(function(){
            res.redirect('/');
        })
        .catch(function(error){
            console.log(error);
        });

        //productosData.create(producto);
       // res.redirect('/');
	   
    },
    delete:function (req,res,next){
        //productosData.delete(req.params.id); 
        db.Curso.destroy({
                where:{
                    id: req.params.id
                }
            }
        ).then(function(){
              res.redirect('/');
        }) .catch(function(error){
            console.log(error);
        });
	   
    }

}
module.exports = controller; 