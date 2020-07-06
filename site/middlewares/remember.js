const tokenService = require('../services/tokenService');
const db = require('./../database/models');
const loginService = require('../services/loginService');

module.exports = (req, res, next) => {

    //cookie sencilla de mantenerme logeado
    if (req.cookies['_rememberUserToken_'] && !req.session.logeado ) {
        //lo logeo si la cookie esta buena
        //busco en la bdd el userId que coincide con la cookie

     
        tokenService.verifyToken( req.cookies['_rememberUserToken_'])
        .then(function(tokenUser) {
            db.User.findOne({where : {id : tokenUser.userId}})
            .then( async (user) => {
                console.log("USER"+ user);
    
                loginService.loginUser(req, res, user); 
    
                if(user.typeId=='2'){
                        req.session.admin = true;
                        res.locals.admin = true;
                }
           
             }).catch(function(error){
                 console.log(error);
                 });
        });

        //req.session.userEmail = req.cookies['_rememberUser_'];
    }

    next();
}