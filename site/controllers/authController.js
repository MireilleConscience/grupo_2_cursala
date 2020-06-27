
//const path = require('path');
const db = require('./../database/models');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const loginService = require('../services/loginService');
const tokenService = require('../services/tokenService');

const controller = {
	rootRegistro:function (req,res){
        
        res.render('users/registro', {errors : {}, body : {}});
	   
    },
    create:function (req,res){
        let validation = validationResult(req);
        console.log(validation.mapped());
        if (!validation.isEmpty()) {
            //return res.send(validation.mapped());
            //console.log("REQ.FILE: "+ req.file.path);
            console.log("REQ.FILE: "+ req.file);

            return res.render('users/registro', {errors : validation.mapped(), body : req.body});
        }
      
            console.log("REQ.FILE: "+ req.file.fieldname);
            console.log("REQ.FILE: "+ req.file.path);
      
        //WINDOWS
        let image= req.file == undefined ? '' : req.file.path.replace('public\\images\\users\\', '') ;
        // LINUX Y MAC
        image= req.file == undefined ? '' : image.replace('public/images/users/', '') ;
       
        
		let user= {
            first_name:req.body.first_name,
            email:req.body.email,
            password : bcryptjs.hashSync(req.body.password, 5),
            avatar: image, 
            typeId:1
        };
        console.log("USER" + user);
        db.User.create(user).then(function(){
            return res.redirect('login'); 
        }).catch(function(error){
            console.log(error);
        });

        //usersData.create(user);
        //res.redirect('users/login');
	   
    },

    formLogin:function (req,res){
        res.render('./users/login',{errors : {}, body : {}});
	   
    },
    login:function (req,res){
      

       let validation = validationResult(req);
        console.log(validation.mapped());

        if (!validation.isEmpty()) {
           
            return res.render('users/login', {errors : validation.mapped(), body : req.body});
        }

        db.User.findOne({where : {email : req.body.email}})
        .then( async (user) => {
            //ahora voy a guardar la cookie de mantenerme logeado
            if (req.body.mantenerme) {
                //aqui si creo la cookie y que expire en 90 dias
                await tokenService.generateToken(res, user);
            }

            loginService.loginUser(req, res, user);
           
            req.session.userName = user.first_name;
            res.locals.userName = user.first_name;
            req.session.userId = user.id;
            if(user.typeId=='2'){
                    req.session.admin = true;
                    res.locals.admin = true;
            }

            return res.redirect('perfil');
        }).catch((error) => {
            console.error(error);
            return res.redirect('login');
        })



       /* db.User.findOne({where:{
                    email : req.body.email
                }
             })
             .then(function(user){
                if(user){ //si el user esta registrado
                    // si logeo corecto
                    if(bcryptjs.compareSync(req.body.password, user.password)){
                    
                       // req.session.logeado = true;
                       // res.locals.logeado = true;
                        req.session.userName = user.first_name;
                        res.locals.userName = user.first_name;
                        req.session.userId = user.id;
                        if(user.typeId=='2'){
                            req.session.admin = true;
                            res.locals.admin = true;
                        }
                        if(req.body.mantenerme){
                            res.cookie('_rememberUser_', req.body.email,  {expires: new Date(Date.now() + 1000*60*60*24*90)});
                        }
                        loginService.loginUser(req, res, user);
                        console.log("REDIRIGE VERS HOME")
                        return res.redirect('/');
                    }
                    else{// si logeo incorrecto, tiene quye volver a registrarse
                        console.log("REDIRIGE VERS LOGIN")
                        return res.redirect('login');
                    }
                }
                
              })
              .catch(function(error){
                console.log(error);
            });*/

    },

    formPerfil:function (req,res){
        db.User.findOne({
            where:{
                       id : req.session.userId
                   }
            })
            .then(function(user){
                  
                      return res.render('users/perfil', {user:user});
                   
           })
           .catch(function(error){
            console.log(error);
        });

	   
    },

    perfil:function (req,res){
        let user;
        if(req.file){
             //WINDOWS
            let image = req.file.path.replace('public\\images\\users\\', '') ;
             // LINUX Y MAC
            image = image.replace('public/images/users/', '') ;
            user= {
                first_name:req.body.first_name,
                avatar: image, 
            }
        }else{
            user = {
                first_name:req.body.first_name,
            }
        }
       
        db.User.update(user,{
                 where:{
                       id : req.session.userId
                   }
                })
                .then(function(user){
                        req.session.userName = req.body.first_name;
                        res.locals.userName = req.body.first_name;
                       return res.redirect('/');
                   
                }).catch(function(error){
                    console.log(error);
                });
    },

    logout:function(req,res){
        
        res.cookie('_rememberUser_' , '', {expire : new Date() - 1});
        loginService.logOutSession(req, res);
        return res.redirect('login');

    },

    carrito:function (req,res){
       res.render('users/carrito');
	   
    }
}

module.exports = controller; 