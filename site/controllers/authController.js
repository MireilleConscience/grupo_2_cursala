const fs = require('fs');
const path = require('path');
const usersData = require ('../models/users');
const db = require('./../database/models');
const bcryptjs = require('bcryptjs');

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

        db.User.findOne({where:{
                    email : req.body.email
                }
             }).then(function(user){
                if(bcryptjs.compareSync(req.body.password, user.password)){
                    req.session.logeado = true;
                    res.locals.logeado = true;
                    req.session.userName = user.first_name;
                    res.locals.userName = user.first_name;
                    req.session.userId = user.id;

                    if(req.body.mantenerme){
                        res.cookie('_rememberUser_', req.body.email,  {expires: new Date(Date.now() + 1000*60*60*24*90)});
                    }
                    res.redirect('/');
                }
                else{
                    res.render('users/login');
                }
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
                }).then(function(user){
                  
                       res.render('users/perfil', {user:user});
                   
           });

	   
    },

    perfil:function (req,res,next){
         //WINDOWS
         let image= req.file == undefined ? '' : req.file.path.replace('..\\public\\', '\\') ;
         // LINUX Y MAC
         image= req.file == undefined ? '' : image.replace('../public/', '/') ;
       
        if (image == ''){
            image=req.body.avatarOld;
        }
         let user= {
             first_name:req.body.first_name,
             avatar: image, 
             typeId:1
         };


        db.User.update(user,{
            where:{
                       id : req.session.userId
                   }
                }).then(function(user){
                        req.session.userName = req.body.first_name;
                        res.locals.userName = req.body.first_name;
                       res.redirect('/');
                   
           });

	   
    },

   

    carrito:function (req,res,next){
       res.render('users/carrito');
	   
    }
}

module.exports = controller; 