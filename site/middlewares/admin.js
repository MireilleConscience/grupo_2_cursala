module.exports = (req, res, next) => {


    if (!(req.session.logeado && req.session.admin)) {
        return res.redirect('/');
    }

    next();
}