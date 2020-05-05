module.exports = {
	index:function (req,res,next){
		
        res.render('home', { title: 'Cursala Home'});
	   
    },
    landing:function (req,res,next){
		
        res.render('landing', { title: 'Cursala Landing'});
	   
    }
}