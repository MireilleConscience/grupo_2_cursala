
//const path = require('path');
const db = require('./../database/models');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const controller = {
	rootRegistro:function (req,res,next){
		
        res.render('users/registro');
	   
    },
    create:function (req,res,next){
       
     
        //WINDOWS
        let image= req.file == undefined ? '' : req.file.path.replace('..\\public\\', '\\') ;
        // LINUX Y MAC
        image= req.file == undefined ? '' : image.replace('../public/', '/') ;
      
        
		let user= {
            first_name:req.body.first_name,
            email:req.body.email,
            password : bcryptjs.hashSync(req.body.password[0], 5),
            avatar: image, 
            typeId:1
        };
        console.log(user);
        db.User.create(user).then(function(){
            res.redirect('users/login'); 
        });

        //usersData.create(user);
        //res.redirect('users/login');
	   
    },

    formLogin:function (req,res,next){
        res.render('users/login');
	   
    },
    login:function (req,res,next){
        /*let us= {
            email:req.body.email,
            password : req.body.password,
        };*/

       /* let validation = validationResult(req)
        //console.log(validation.mapped());

        if (!validation.isEmpty()) {
            //return res.send(validation.mapped());
            return res.render('users/login', {errors : validation.mapped(), body : req.body});
        }
        */


        db.User.findOne({where:{
                    email : req.body.email
                }
             })
             .then(function(user){
                if(user){ //si el user esta registrado
                    // si logeo corecto
                    if(bcryptjs.compareSync(req.body.password, user.password)){
                        req.session.logeado = true;
                        res.locals.logeado = true;
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
                        res.redirect('/');
                    }
                    else{// si logeo incorrecto, tiene quye volver a registrarse
                        res.redirect('users/login');
                    }
                }else{ // el user no esta registrado. primero tiene que registrarse
                    res.redirect('users/registro');

                }
                
              })
              .catch(function(error){
                console.log(error);
            });

      /*  if(usersData.findByEmail(user)){
            res.redirect('/');
        }
		else{
            res.render('users/login', { title: 'Cursala Login'});
        }
	   */
    },

    formPerfil:function (req,res,next){
        db.User.findOne({
            where:{
                       id : req.session.userId
                   }
            })
            .then(function(user){
                  
                       res.render('users/perfil', {user:user});
                   
           })
           .catch(function(error){
            console.log(error);
        });

	   
    },

    perfil:function (req,res,next){
        let user;
        if(req.file){
             //WINDOWS
            image = req.file.path.replace('..\\public\\', '\\') ;
             // LINUX Y MAC
            image = image.replace('../public/', '/') ;
            user= {
                first_name:req.body.first_name,
                avatar: image, 
                typeId:1
            }
        }else{
            user = {
                first_name:req.body.first_name,
                typeId:1
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
                       res.redirect('/');
                   
                }).catch(function(error){
                    console.log(error);
                });
    },

   

    carrito:function (req,res,next){
       res.render('users/carrito');
	   
    }
}

module.exports = controller; 