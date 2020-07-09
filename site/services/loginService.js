const tokenService = require('./tokenService');

module.exports = {
    minutesPerSession : 1200000,
    restartSessionTime: function (req) {
        let date = new Date(Date.now() + this.minutesPerSession);

        req.session.cookie.expires = date;
    },
    loginUser: function (req, res, user) {
        let date = new Date(Date.now() + this.minutesPerSession);

        req.session.cookie.expires = date;
        req.session.cookie.maxAge = this.minutesPerSession;

        res.locals.logeado = true;
        req.session.logeado = true;
        user.password='';
        req.session.user = user;
        res.locals.user = user;

    },
    rememberUser: function (user) {

    },
    logOutSession: function (req, res) {
        if (req.session) {
            if (req.cookies['_rememberUserToken_']){
                tokenService.deleteToken (req.session.userId, req.cookies['_rememberUserToken_']).then(()=>{
                    res.cookie('_rememberUserToken_' , '', {expire : new Date() - 1});
                });
             }
            let date = new Date(Date.now() - 100);
            req.session.cookie.expires = date;
            req.session.cookie.maxAge = -100;
            // si estaba loggeado con rememberme tiene que suprimir el token
           
        }

        //return res.redirect('/login');
    }
}