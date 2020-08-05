/*const fs = require('fs');
const path = require('path');
const productosData = require ('../models/products');*/
const db = require('./../database/models');
const { validationResult } = require('express-validator');

const {Op} = require('sequelize');

const controller = {

    /******************** Hacia la home, da la lista de todos los productos *****************/

    root:function (req,res,next){
        let mensaje=null;
        if(req.session && req.session.mensaje){
            mensaje = req.session.mensaje;
            req.session.mensaje="";
        }
    
    if(req.query.busqueda){
        
        db.Curso.findAll({
            where:{
                name:{[Op.like] :  '%' + req.query.busqueda + '%'}
            },
            order : [
                ['name','ASC'],
            ],
            include : ['categorias',  "users"]
        })
        .then(function(listaProductos){
            
               return  res.render('home', { listaProductos:listaProductos , pages:null, page:'1', mensaje:mensaje});
            
                
        })
        .catch(function(error){
            console.log(error);
        });

    }else{


        let offset = 0;
        let limit = 8;
        //si me mandan la pagina entonces voy a calcular el offset
       let nextPage = 1;

        if(req.query.nextPage){

            nextPage = req.query.nextPage;
            offset = (req.query.nextPage - 1) * limit;
      }

      db.Curso.findAndCountAll({
        order : [
            ['categoryId' , 'ASC']
        ],
        //esto lo useré en el paginador
            limit : limit,
            offset : offset,
            include : ['categorias',  "users"]
        })
        .then(function(data){
            const listaProductos = data.rows;
            const count = data.count;
            const pages = Math.ceil(count / limit);
         res.render('home', { listaProductos:listaProductos, pages:pages,page:nextPage, mensaje:mensaje });
        })
        .catch(function(error){
            console.log(error);
        });

    }
     
    },
      /******************** lista de los productos por Categoria *****************/

    productsPorCategoria:function (req,res,next){

        db.Curso.findAll({
            where:{
                categoryId: req.params.idCat
            },
            include: [{association: "categorias"}] 
        })
        .then(function(listaProductos){
            res.render('home', { listaProductos:listaProductos, pages:null,page:'1', mensaje:null });
        })
        .catch(function(error){
            console.log(error);
        });
       
    },

     /******************** lista de los productos por Nombre *****************/
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
            
               return  res.render('home', { listaProductos:listaProductos, mensaje:null });
            
                
        })
        .catch(function(error){
            console.log(error);
        });
       
       
    },

     /*************************** Detalle de un Producto **** */

	detail:function (req,res,next){
     console.log("DETAILLE");
       // let producto = productosData.findByPK(req.params.id);
       db.Curso.findOne({
        where:{
            id: req.params.id
        },
        include: [{association: "categorias"}] 
      })
       .then(function(producto){
                if(producto){  res.render('products/product_detail', { producto: producto, mensaje:null});
                  
                }else{
                    res.redirect('/');
                }
                
        })
        .catch(function(error){
            console.log(error);
        });
      
    },


      /*************************** Edicion de un Producto ****************************/
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
            res.render('products/product_edicion', { errors:{}, producto: producto, categorias: categorias });
        }else{
            res.redirect('/');
        }   
    })
    .catch(function(error){
            console.log(error);
        });
    },

 /*************************** Update de un Producto ****************************/

    update:function (req,res,next){

        // se guarda en producto el contenido del formulario 
        let producto= {
            id:req.body.idProducto, // campo hidden de la view
            name:req.body.name,
            description: req.body.description,
            price:req.body.price,
            categoryId:req.body.categoryId, 
            length:req.body.length
           };

        let validation = validationResult(req);
        console.log(validation.mapped());
        if (!validation.isEmpty()) {
           // req.body.categorias :  campo hidden de la view, para no tener que pedir la lista de categorias otra vez en la BDD
            
            return res.render('products/product_edicion', { errors : validation.mapped(),  producto:producto, categorias:JSON.parse(req.body.categorias)});
        }
        

        if(req.file){
         
          // Si una imagen de producto se subio hay que guardarla
           producto.image =req.file.filename; 
        }

        //console.log ("id producto "+ req.params.id);

        db.Curso.update(
            producto,{
                where:{
                    //id: req.params.id     //req.params.id devient undefined si la validacion du formulaire a donne des erreurs
                    id: req.body.idProducto 
                }
            }
        ).then(function(){
              res.redirect('/');
        }) .catch(function(error){
            console.log(error);
        });
    },


    /*************************** Hacia el formulario de creacion de Producto **********/
    rootCarga:function (req,res,next){
        db.Category.findAll()
             .then(function(categorias){
                console.log("categoria = " + categorias);
                for(cat of categorias){
                    console.log("categoria = " + cat);
                }
                res.render('products/product_carga', { errors : {}, body : {}, categorias: categorias});
           })
           .catch(function(error){
            console.log(error);
        });
    },

     /*************************** Creacion de un Producto ****************************/

    create:function (req,res,next){

        let validation = validationResult(req);
        console.log(validation.mapped());
        if (!validation.isEmpty()) {
            console.log("req.body = " + req.body.categorias);
            return res.render('products/product_carga', { errors : validation.mapped(), body : req.body,  categorias:JSON.parse(req.body.categorias)});
        }
         
		let producto= {
            name:req.body.name,
            description: req.body.description,
            image: req.file == undefined ? '' : req.file.filename ,
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

     /*************************** Supresion de un Producto ****************************/

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