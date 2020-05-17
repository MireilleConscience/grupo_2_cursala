module.exports = {
	index:function (req,res,next){
		
        res.render('home');
	   
    },
    landing:function (req,res,next){
		
        res.render('landing');
	   
    }
}