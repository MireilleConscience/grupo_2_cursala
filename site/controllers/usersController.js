
//const path = require('path');
const db = require('../database/models');
const {Op} = require('sequelize');

const controller = {
 
    /***********************************Edita el contenido del carrito ********/

    edit:function (req,res){
        let user = req.session.user;
        
        db.User.findByPk(user.id,{
            include: [{association: "cursos",
            required:false}]
            })
        .then(function(resultado){
            req.session.listaCursos = resultado.cursos;
            res.locals.listaCursos =  resultado.cursos;
            res.render('users/carrito',{listaCursos:resultado.cursos});
           
        }).catch(function(error){
           console.log(error);
           
        });

        
	   
    },
    /***********************************Delete un producto en el carrito ********/

    delete:function (req,res){
         let user = req.session.user;
        let productoId = req.params.id;


        db.CursoUser.destroy({
            where:{users_id: req.session.user.id,
                   cursos_id: productoId}
        }).then(function(){
            return res.redirect('editCarrito');
        }) .catch(function(error){
            console.log(error);
        });
        
        
        
     },

      /***********************************MODIFICAR la cantidad de un producto en el carrito ********/

    update:function (req,res){
        let user = req.session.user;
        let productoId = req.params.id;
        let userCurso = { cantidad :req.body.cantidad};
        db.CursoUser.update(
            userCurso,{
            where:{
             [Op.and] :
             [
                {cursos_id: req.params.id},
                {users_id: req.session.user.id}
            ]
        }
        }).then(function(){
        
        res.redirect('editCarrito');
        }) .catch(function(error){
        console.log(error);
    });

     
       
    },
      /***********************************Agregar un producto en el carrito ********/

    add:function (req,res){
    let listaCursos = req.session.listaCursos;
    let encontrado = false;

       let userCurso = {
           cursos_id: req.params.id,
           users_id: req.session.user.id,
           cantidad :req.body.cantidad
        };

        // se busca si el curso esta ya en el carrito
        for(curso of listaCursos){
            if(!encontrado){
                encontrado = curso.CursoUser.cursos_id == req.params.id ? true : false;
            }
        }  
        // si no esta, lo agrego al carrito
        if(!encontrado){
            db.CursoUser.create(userCurso)
            .then(function(resu){
              
                //actualizo el carrito guardado en sesion a partir de la BD
               db.User.findByPk(req.session.user.id,{
                    include: [{association: "cursos",
                    required:false}]
                })
                 .then(function(resultado){
                    req.session.listaCursos = resultado.cursos;
                    res.locals.listaCursos =  resultado.cursos;
                    return res.redirect('/');
               
                }).catch(function(error){
                    console.log(error);
                });

                
            }).catch(function(error){
            console.log(error);
            });

        }else{ // si ya esta en el carrito, no lo agrego
            // tendria que poner un mensaje para decir que el producto que se quiso agregar ya estaba en el carrito
            return res.redirect('/');
        }
      



       
    },

     /***********************************VALIDAR  el carrito ********/

     validar:function (req,res){
        let user = req.session.user;
        let listaCursos = req.session.listaCursos;
        let cantidad=0;
        let precioTotal=0;

        // se calcula la cantidad total de productos y precio total
        for(curso of listaCursos){
            cantidad += curso.CursoUser.cantidad;   
            precioTotal += curso.price * curso.CursoUser.cantidad;
        }  
      
        let compras={
            cantidad:cantidad,
            price:precioTotal,
            users_id: req.session.user.id
        }

        //insertar la compras en la tabla de las compras
        db.Compras.create(compras)
        .then(function(){
           
        }).catch(function(error){
            console.log(error);
        });

       // vaciar el contenido del carrito asociado al user
        db.CursoUser.destroy({
            where:{users_id: req.session.user.id}
        }).then(function(){
        
        }) .catch(function(error){
            console.log(error);
        })

        //actualizar el carrito en session
        req.session.listaCursos = null;
        res.locals.listaCursos =  null;
 
 
        res.redirect('/');
        
        
     }
}

module.exports = controller; 