const {check, validationResult, body} = require('express-validator');

let validationLogin = [
    check('password').isLength({min:4})
        .withMessage('Invalid Password, min 4 characters').bail(),
    check('email').isEmail()
        .withMessage('Invalid Email')
        /*
        .custom((value, { req }) => {
            return db.User.findOne({where :{email : value}}).then(user => {
                if (user == null) {
                    return Promise.reject('Wrong credentials');
                } else if (user && !bcryptjs.compareSync(req.body.password , user.password)) {
                    return Promise.reject('Wrong credentials');
                }
            })
        }), */
];

module.exports = validationLogin;

