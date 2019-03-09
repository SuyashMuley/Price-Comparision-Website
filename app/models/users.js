var mongoose 		=	require('mongoose');
var Schema 			=	mongoose.Schema;
var bcrypt 			=	require('bcrypt-nodejs');
var titlize 		=	require('mongoose-title-case');
var validate 		=	require('mongoose-validator');

var nameValidator=[
	validate({
		validator 	: 'matches',
		arguments	: /^[a-zA-Z]{3,20}$/
	})
];

var emailValidator=[
	validate({
		validator 	: 'matches',
		arguments 	: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	})
];

var mobileValidator=[
	validate({
		validator 	: 'matches',
		arguments 	: /^(\+\d{1,3}[- ]?)?\d{10}$/
	})
];

var passwordValidator = [
  	validate({
    	validator: 'isLength',
    	arguments: [5,20]
 	})
];
var UserSchema = new Schema({
	name:{ type : String , required : true , validate : nameValidator},
	email:{ type : String , lowercase : true , required : true , unique : true , validate: emailValidator},
	password:{ type : String , required : true , validate : passwordValidator},
	mobile:{ type : String , required : true , unique : true , validate : mobileValidator},
	resettoken:{ type : String , required : false},
	wishlist:{ type:Array , default : [] }
	
});

UserSchema.plugin(titlize,{
	paths:['name']
});

UserSchema.pre('save',function(next){
	var user=this;
	bcrypt.hash(user.password,null,null,function(err,hash){
		if(err) return next(err);
		user.password=hash;
		next();

	});
});

UserSchema.methods.comparePassword=function(password){
	return bcrypt.compareSync(password,this.password);
};

module.exports=mongoose.model('User',UserSchema);
