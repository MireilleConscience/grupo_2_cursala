const express = require('express');
const app = express();
const morgan = require('morgan');

// SETTINGS
app.set('port', process.env.PORT || 3030);
app.set('json spaces', 2); //para tener mas lindo el json

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false})); //entendiendo los datos de los input de los forms
app.use(express.json()); //es para entender los json 

// ROUTES
app.use(require('./routes/index'));
app.use(require('./routes/products'));


// SERVER
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
    
});