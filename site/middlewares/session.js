
const loginService = require('../services/loginService');
module.exports = (req, res, next) => {

    res.locals.logeado = false;
    res.locals.user= null;

    if (req.session.logeado) {
        res.locals.logeado = true;
        res.locals.user = req.session.user;
        loginService.restartSessionTime(req);
      /*  if (req.session.admin) {
            res.locals.admin = true;
        }*/
    }

    next();
}