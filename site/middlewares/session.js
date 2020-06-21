
module.exports = (req, res, next) => {

    res.locals.logeado = false;
    res.locals.userName = '';
    res.locals.admin = false;
    if (req.session.logeado) {
        res.locals.logeado = true;
        res.locals.userName = req.session.userName;
        if (req.session.admin) {
            res.locals.admin = true;
        }
    }

    next();
}