const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const {Op} = require('sequelize');
let sequelize = require('sequelize');

const controller = {

    listaCategorias:function (req,res,next){

        db.Category.findAll({
            /*attributes: ['*',[sequelize.fn('COUNT', sequelize.col('cursos.id')), 'cantidad']],*/
            include: [{association: "cursos",
                        required:false
            }],
             group: 'category.id'
        })
        .then(function(listaCategorias){
            for(cat of listaCategorias){
               // console.log(cat);
                console.log('categoria '  + cat.name + " " + cat.id +  " " + cat.cursos.length);
            }
            res.render('categorias/categorias', { listaCategorias:listaCategorias });
        })
        .catch(function(error){
           console.log(error);
           
        });




        /*db.Category.findAll()
        .then(function(listaCategorias){
            res.render('categorias/categorias', { listaCategorias:listaCategorias });
        })
        .catch(function(error){
           console.log(error);
           
        });*/
       
    },

    
	formEdicion:function (req,res,next){
     
        let pedidoCategory= db.Category.findByPk(req.params.id)
       .then(function(category){
                if(category){
                    res.render('categorias/categoria_edicion', {categoria:category});
                }else{
                    res.redirect('/');
                }
                
        })
        .catch(function(error){
            console.log(error);
        });
      
    },

    formCreate:function (req,res,next){
             res.render('categorias/categoria_creacion');   
    },

    update:function (req,res,next){
        let categoria= {
             name:req.body.name,
            };
  
        db.Category.update(
            categoria,{
                where:{
                    id: req.params.id
                }
            }
        ).then(function(){
              res.redirect('/categorias/lista');
        }) .catch(function(error){
            console.log(error);
        });
    },

    create:function (req,res,next){
		let categoria= {
            name:req.body.name,
        };

        db.Category.create(categoria)
        .then(function(){
            res.redirect('/categorias/lista');
        })
        .catch(function(error){
            console.log(error);
        });
    },

    delete:function (req,res,next){
        db.Category.destroy({
                where:{
                    id: req.params.id
                }
            }
        ).then(function(){
              res.redirect('/categorias/lista');
        }) .catch(function(error){
            console.log(error);
        });
	   
    }

}
module.exports = controller; 