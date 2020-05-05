module.exports = {
	registro:function (req,res,next){
		
        res.render('registro', { title: 'Cursala Registro'});
	   
    },
    carrito:function (req,res,next){
		
        res.render('carrito', { title: 'Cursala Carrito'});
	   
    }
}