var mongoose	= require('mongoose');
var Schema 		= mongoose.Schema;
var titlize 	= require('mongoose-title-case');
var validate 	= require('mongoose-validator');

var nnyscoreValidator = [
	validate({
		validator : 'matches',
		arguments : /^(10|\d)(\.\d{1,2})?$/
	})
];



var ProductSchema = new Schema({
	ptitle 	: { type: String , required : true , unique : true },
	pid 	: { type: String , required : true , unique : true },
	pimages_small	: { type : Array , default : [] , required : true },
	pimages_large	: { type : Array , default : [] , required : true },
	pcategory   : { type : String , required : true },
	pbrand 		: { type : String , required : true },

});	


ProductSchema.plugin(titlize,{
	paths:['pname']
});

module.exports = mongoose.model('Product',ProductSchema);