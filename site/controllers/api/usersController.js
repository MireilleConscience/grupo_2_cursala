
//const path = require('path');
const db = require('../../database/models');
const {Op} = require('sequelize');



/******************************************* CONTROLLER  API USERS ******************/

const controller = {
 
   
    /***********************************Delete un producto en el carrito ********/

    delete:function (req,res){

        if (!req.session || !req.session.user) {
            return res.json({ status : 401 , response : 'usuario no logeado'});
        }
        let user = req.session.user;
        let productoId = req.body.productoId;

        db.CursoUser.destroy({
            where:{users_id: req.session.user.id,
                   cursos_id: productoId}
        }).then(function(respuesta){

            res.json(respuesta);
        }) .catch(function(error){
            console.log(error);
        });
        
        
        
     },


     /****************** Lista de los USUARIOS *****************/
     listUsers:function (req,res){
      
       
        db.User.findAndCountAll({
            attributes: ['id', 'firstName', 'email']
        })
        .then(function(respuesta){
            console.log(respuesta);
            let users =[];
            let user;
            for(resp of respuesta.rows){
                console.log(resp);
                user={
                    id: resp.dataValues.id,
                    name: resp.dataValues.firstName,
                    email: resp.dataValues.email,
                    detail: 'api/users/'+ resp.dataValues.id,
                }
                users.push(user);
            }
            let resultado = {
                meta:{

                    status:200,
                    count : respuesta.count,
                },
               
                data : users,
            }
           res.json(resultado);

           

        })
        .catch(function(error){
            console.error(error);
           
        });

    },


 /****************** Detalle de un USUARIO *****************/
    detalleUser:function (req,res){
      
       
        db.User.findOne({
            where:{
               id: req.params.id
            }
        })
        .then(function(resp){

            let respuesta ={
                meta : {
                    status:200,
                },

                data: { 
                    id: resp.dataValues.id,
                    name: resp.dataValues.firstName,
                    email: resp.dataValues.email,
                    url_avatar: resp.dataValues.avatar,
                }

            }
           
           
            res.json(respuesta);

        })
        .catch(function(error){
            console.error(error);
        
        });

    }


}

module.exports = controller; 