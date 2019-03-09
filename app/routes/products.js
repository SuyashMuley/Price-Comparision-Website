var Product 	= require('../models/products');

module.exports=function(router){

    router.post('/addproducts',function(req,res,next){
		var product = new Product();
		product.pid=req.body.pid;
		product.ptitle=req.body.ptitle;
		product.pcategory=req.body.pcategory;
		var smallimages=[];
		smallimages.push(req.body.psimage1);
		smallimages.push(req.body.psimage2);
		smallimages.push(req.body.psimage3);
		smallimages.push(req.body.psimage4);
		smallimages.push(req.body.psimage5);
		var largeimages=[];
		largeimages.push(req.body.plimage1);
		largeimages.push(req.body.plimage2);
		largeimages.push(req.body.plimage3);
		largeimages.push(req.body.plimage4);
		largeimages.push(req.body.plimage5);
		product.pimages_small=smallimages;
		product.pimages_large=largeimages;
		product.pbrand=req.body.pbrand;
		


		product.save(function(err){
			if(err){
				res.json({success : false , message : 'Error Occured'});
			}else{
				res.json({success : true , message : 'successfully saved!' });
			}
        })
    });

    return router;
}