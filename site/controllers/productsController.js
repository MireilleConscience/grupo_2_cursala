module.exports = {
	detail:function (req,res,next){
		
        res.render('products/product_detail', { title: 'Cursala - Detalle de Producto'});
	   
    },
    create:function (req,res,next){
		
        res.render('products/product_carga', { title: 'Cursala - Carga de Producto'});
	   
    }
}