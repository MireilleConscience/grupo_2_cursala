module.exports = (req, res, next) => {


    if (!req.session.logeado) {
        return res.redirect('/login');
    }

    next();
}