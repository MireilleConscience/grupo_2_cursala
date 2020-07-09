module.exports = (req, res, next) => {


    if (!(req.session.logeado && req.session.user.admin)) {
        return res.redirect('/');
    }

    next();
}