module.exports = {
	registro:function (req,res,next){
		
        res.render('registro', { title: 'Cursala Registro'});
	   
    },
    login:function (req,res,next){
		
        res.render('login', { title: 'Cursala Login'});
	   
    },
    carrito:function (req,res,next){
		
        res.render('carrito', { title: 'Cursala Carrito'});
	   
    }
}