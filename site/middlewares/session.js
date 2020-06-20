
module.exports = (req, res, next) => {

    res.locals.logeado = false;
    res.locals.userName = '';
    if (req.session.logeado) {
        res.locals.logeado = true;
        res.locals.userName = req.session.userName;
    }

    next();
}