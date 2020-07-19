
//const path = require('path');
const db = require('../database/models');
const {Op} = require('sequelize');

const controller = {
 
    /***********************************Edita el contenido del carrito ********/

    edit:function (req,res){
        let user = req.session.user;
        db.User.findByPk(user.id)
        .then(function(userDB){
           userDB.getCursos()
            .then(function(listaCursos){
                for(curso of listaCursos){
                  
                    console.log('CARRITO producto cantidad '  + curso.CursoUser.cantidad );
                }
                res.render('users/carrito',{listaCursos:listaCursos});
             })
            .catch(function(error){
                console.log(error);
            });
                
        }).catch(function(error){
           console.log(error);
           
        });

        
       
	   
    },
    /***********************************Delete un producto en el carrito ********/

    delete:function (req,res){
         let user = req.session.user;
        let productoId = req.params.id;

        
        db.User.findByPk(user.id)
         .then(function(user){
            db.Curso.findByPk(productoId)
                .then(function(producto){
                     user.removeCursos([producto])
                     .then(function(resultado){
                        return res.redirect('editCarrito');
                        });
                 })
                .catch(function(error){
                    console.log(error);
                });
        
          })
        .catch(function(error){
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
       let user = req.session.user;
       let productoId = req.params.id;
       let cantidad = req.body.cantidad;

       
       db.User.findByPk(user.id)
        .then(function(user){
           db.Curso.findByPk(productoId)
               .then(function(producto){
                    user.addCursos([producto], {through:{cantidad: cantidad}})
                    .then(function(resultado){
                       return res.redirect('/');
                       });
                })
               .catch(function(error){
                   console.log(error);
               });
       
         })
       .catch(function(error){
           console.log(error);
       });

       
       
    }
}

module.exports = controller; 