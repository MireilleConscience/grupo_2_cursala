const db = require('../database/models');
const bcryptjs = require('bcryptjs');


module.exports = {
    generateToken : async (res, user) => {
        //TO-DO delete previous tokens si existe
        console.log("USERID :" + user.id );
       // await db.Token.destroy({where : {userId : user.id}});

        let token = bcryptjs.hashSync(('_' + user.id + Date.now()), 2);
        let expires = new Date(Date.now() + 1000*60*60*24*90);
        console.log("USERID :" + user.id );
        await db.Token.create({ userId : user.id, token : token, expiresAt : expires })
        res.cookie('_rememberUserToken_', token,  {expires: expires});
    },
    getUserToken : (user) => {


    },
    checkUserToken : (user) => {

    },
    verifyToken : async (token) => {
       let tokenUser = await db.Token.findOne({where : {token : token}});
       return tokenUser;
    },
    deleteToken : async (userId, token) => {
         //TO-DO delete previous tokens si existe
         await db.Token.destroy({where :  {userId : userId, token: token}});
    }
}