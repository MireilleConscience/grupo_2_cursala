
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
        }).then(function(){

            res.json(respuesta);
        }) .catch(function(error){
            console.log(error);
        });
        
        
        
     }
}

module.exports = controller; 