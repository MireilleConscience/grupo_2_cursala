
//const path = require('path');
const db = require('./../database/models');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const loginService = require('../services/loginService');
const tokenService = require('../services/tokenService');

const controller = {

     /****************** HACIA EL FORMULARIO DE REGISTRO DEL USUARIO *****************/
	rootRegistro:function (req,res){
        
        res.render('users/registro', {errors : {}, body : {}});
	   
    },

    /****************** REGISTRO DEL USUARIO *****************/
    create:function (req,res){
        let validation = validationResult(req);
        console.log(validation.mapped());
        if (!validation.isEmpty()) {

            return res.render('users/registro', {errors : validation.mapped(), body : req.body});
        }
      
      
        //WINDOWS
        let image= req.file == undefined ? '' : req.file.path.replace('public\\images\\users\\', '') ;
        // LINUX Y MAC
        image= req.file == undefined ? '' : image.replace('public/images/users/', '') ;
       
        
		let user= {
            firstName:req.body.firstName,
            email:req.body.email,
            password : bcryptjs.hashSync(req.body.password, 5),
            avatar: image, 
            admin:0
        };
        console.log("USER" + user);
        db.User.create(user).then(function(){
            return res.redirect('login'); 
        }).catch(function(error){
            console.log(error);
        });

	   
    },

    /****************** HACIA EL FORMULARIO DE LOGIN DEL USUARIO *****************/
    formLogin:function (req,res){
        res.render('./users/login',{errors : {}, body : {}});
	   
    },

     /****************** LOGIN DEL USUARIO *****************/
    login:function (req,res){
      
       let validation = validationResult(req);
        console.log(validation.mapped());

        if (!validation.isEmpty()) {
           
            return res.render('users/login', {errors : validation.mapped(), body : req.body});
        }
       
        db.User.findOne({where : {email : req.body.email}})
        .then( async (user) => {
            console.log("USER"+ user);
            //ahora voy a guardar la cookie de mantenerme logeado
            if (req.body.mantenerme) {
                //aqui si creo la cookie y que expire en 90 dias
                await tokenService.generateToken(res, user);
            }

            loginService.loginUser(req, res, user);
           

            return res.redirect('perfil');
        }).catch((error) => {
            console.error(error);
            return res.redirect('login');
        })

    },
     /****************** HACIA EL UPDATE DEL PERFIL DEL USUARIO *****************/

    formPerfil:function (req,res){
        /*db.User.findOne({
            where:{
                       id : req.session.user.id
                   }
            })
            .then(function(user){
                  
                      return res.render('users/perfil', {user:user, errors : {}, body : {}});
                   
           })
           .catch(function(error){
            console.log(error);
        });*/
        return res.render('users/perfil', {user:req.session.user, errors : {}, body : {}});
	   
    },

    /****************** UPDATE DEL PERFIL DEL USUARIO *****************/

    perfil:function (req,res){
        let validation = validationResult(req);
        console.log(validation.mapped());
        if (!validation.isEmpty()) {

            return res.render('users/perfil',{user:req.session.user,errors : validation.mapped(), body : req.body});
        }
        
        
        let user = {
            id:req.session.user.id,
            firstName:req.body.firstName
        };
        if(req.file){
             //WINDOWS
            let image = req.file.path.replace('public\\images\\users\\', '') ;
             // LINUX Y MAC
            image = image.replace('public/images/users/', '') ;
            user= {
                id:req.session.user.id,
                firstName:req.body.firstName,
                avatar: image
             } 
        }
       
        db.User.update(user,{
                 where:{
                       id : req.session.user.id
                   }
                })
                .then(function(resultado){
                        req.session.user = user;
                        res.locals.user = user;
                       return res.redirect('/');
                   
                }).catch(function(error){
                    console.log(error);
                });
    },

      /******************LOGOUT DEL USUARIO*****************/

    logout:function(req,res){
        loginService.logOutSession(req, res);
        return res.redirect('login');

    },

    carrito:function (req,res){
       res.render('users/carrito');
	   
    }
}

module.exports = controller; 