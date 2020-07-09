const fs = require('fs');
const path = require('path');
const productosData = require ('../models/products');
const db = require('./../database/models');

const {Op} = require('sequelize');

const controller = {

    root:function (req,res,next){
 
      /*  db.Curso.findAll()*/
      db.Curso.findAll({
        include: [{association: "categorias"}] 
         })
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
            },
            include: [{association: "categorias"}] 
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
            ],
            include: [{association: "categorias"}] 
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
       db.Curso.findOne({
        where:{
            id: req.params.id
        },
        include: [{association: "categorias"}] 
      })
       .then(function(producto){
                if(producto){
                    res.render('products/product_detail', { producto: producto});
                }else{
                    res.redirect('/');
                }
                
        })
        .catch(function(error){
            console.log(error);
        });
      
    },

    rootCarga:function (req,res,next){
        db.Category.findAll()
             .then(function(categorias){
                res.render('products/product_carga', { categorias: categorias});
           })
           .catch(function(error){
            console.log(error);
        });
    },

    productEdicion:function (req,res,next){
    let pedidoProducto = db.Curso.findOne({
    where:{
            id: req.params.id
        },
        include: [{association: "categorias"}] 
    })


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
        
        if(req.file){
            //WINDOWS
           let image = req.file.path.replace('public\\images\\products\\', '') ;
            // LINUX Y MAC
           image = image.replace('public/images/products/', '') ;
            
           producto= {
            name:req.body.name,
            description: req.body.description,
            image: image,
            price:req.body.price,
            categoryId:req.body.category, 
            length:req.body.length
             };
       }else{
            producto= {
             name:req.body.name,
             description: req.body.description,
             price:req.body.price,
             categoryId:req.body.category, 
             length:req.body.length
            };
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
        let image= req.file == undefined ? '' : req.file.path.replace('public\\images\\products\\', '') ;
        // LINUX Y MAC
        image= req.file == undefined ? '' :  image.replace('public/images/products/', '') ;
      
		let producto= {
            name:req.body.name,
            description: req.body.description,
            //image: req.file == undefined ? '' : req.file.filename, 
            image: image ,
            price:req.body.price,
            categoryId:req.body.categoryId,
            length:req.body.length
        };

      
        db.Curso.create(producto)
        .then(function(){
            res.redirect('/');
        })
        .catch(function(error){
            console.log(error);
        });
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