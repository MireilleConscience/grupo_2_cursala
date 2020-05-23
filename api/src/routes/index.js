const {Router} = require('express');
const router = Router();


router.get('/', (req,res)=>{
    const data = {
        "name":"Cursala",
        "website":"www.cursala.com.ar"
    };
    res.json(data);
});

module.exports = router;