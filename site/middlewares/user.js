module.exports = (req, res, next) => {


    if (req.session.logeado) {
        res.redirect('/');
    }

    next();
}