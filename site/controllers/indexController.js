module.exports = {
	index:function (req,res,next){
		
        res.render('index', { title: 'Cursala Home'});
	   
    },
    landing:function (req,res,next){
		
        res.render('landing', { title: 'Cursala Landing'});
	   
    }
}