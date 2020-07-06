
module.exports = (req, res, next) => {

    res.locals.logeado = false;

    res.locals.admin = false;
    if (req.session.logeado) {
        res.locals.logeado = true;
        res.locals.user = req.session.user;
        if (req.session.admin) {
            res.locals.admin = true;
        }
    }

    next();
}