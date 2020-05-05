module.exports = {
	detail:function (req,res,next){
		
        res.render('productDetail', { title: 'Cursala - Detalle de Producto'});
	   
    },
    carga:function (req,res,next){
		
        res.render('productCarga', { title: 'Cursala - Carga de Producto'});
	   
    }
}