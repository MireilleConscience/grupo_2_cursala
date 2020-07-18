module.exports = (req, res, next) => {


    if (!req.session.logeado) {
       
        return res.redirect('stop');
    }

    next();
}