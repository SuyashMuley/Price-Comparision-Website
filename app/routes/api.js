var User 		= require('../models/users');
var Product 	= require('../models/products');
var jwt 	    = require('jsonwebtoken');
var secret		= 'vinsmokesanji';
var nodemailer  = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'travelworldwithme10@gmail.com',
    pass: 'gomugomuno'
  }
});
 




module.exports=function(router){
	router.post('/users',function(req,res){
		var user = new User();
		user.name=req.body.name;
		user.email=req.body.email;
		user.password=req.body.password;
		user.mobile=req.body.mobile;
		if(req.body.name=='' || req.body.email=='' || req.body.password=='' || req.body.mobile=='' || req.body.name==null || req.body.email==null || req.body.password==null || req.body.mobile==null){
			res.json({ success : false, message: 'Ensure all fields are filled'});
		}
		else{
			user.save(function(err){
				if(err){
					if(err.code == 11000){
						res.json({success: false , message: 'email or mobile already taken'});
					}
					else if(err.errors.name){
						res.json({success: false , message : 'Name must consist only Alphabets and should not contain more than 20 letters'})
					}
					else if(err.errors.email){
						res.json({success: false , message : 'invalid email format'});
					}
					else if(err.errors.mobile){
						res.json({success: false , message: 'inavlid mobile number'});
					}
					else if(err.errors.password){
						res.json({success: false ,  message : 'password must contain min 5 and max 20 charaters'});
					}
					else{
						res.json({success: false, message: 'invalid input'});
					}
					

				}
				else{
					res.json({ success: true, message: 'user created' });
				}
			});
		}
		
	});



	router.post('/checkemail',function(req,res){
		User.findOne({ email : req.body.email}).select('email').exec(function(err,user){
			if(err){
				res.json({success:false , message: 'Please fill the details'});
			}

			else if(user){
				res.json({success:false , message : 'Oops! You are already in our family...'});
			}
			else{
				res.json({success:true , message: 'NNY is happy to welcome you '+req.body.name});
			}
		});
	});


	router.post('/checkmobile',function(req,res){
		User.findOne({ mobile : req.body.mobile}).select('mobile').exec(function(err,user){
			if(err){
				res.json({success:false , message: 'Please fill the details'});
			}

			if(user){
				res.json({success:false , message : 'Oops! This mobile number is already linked with one of our family member..'});
			}
			else{
				res.json({success:true , message: 'Ready to go!'});
			}
		});
	});



	router.post('/authenticate',function(req,res){
		User.findOne({ email : req.body.email}).select('name email password mobile resettoken').exec(function(err,user){
			if(err){
				res.json({success:false , message: 'Please fill the details'});
			}

			if(!user){
				res.json({success:false , message: 'Sorry! User not found!'});
			}

			else if(user){
				if(req.body.password){
					var validPassword = user.comparePassword(req.body.password);
					if(validPassword){					
						var token=jwt.sign({name: user.name , email: user.email , mobile: user.mobile , password: user.password},secret,{expiresIn:'240000h'});
						res.json({success:true , message: 'User found!',token:token});
					}
					else if(!validPassword){
						res.json({success:false , message: "Please ensure you've entered correct password"});
					}
				}
				else{
					res.json({success:false , message: 'Please Provide Password'});
				}
			}			
		});
	});

	router.put('/resetpassword',function(req,res){
		User.findOne({ email : req.body.email }).select('name email resettoken mobile').exec(function(err,user){
			if(err){
				res.json({success: false , message: 'enter valid email'});
			}
			else{
				if(!user){
					res.json({success: false , message:'sorry! No user by that email'})
				}else if(user){
					user.resettoken=jwt.sign({name: user.name , email: user.email , mobile: user.mobile},secret,{expiresIn:'1h'});
					user.save(function(err){
						if(err){
							res.json({success : false , message : 'error occuring'});
						}
						else{
							var mailOptions = {
							  from: 'travelworldwithme10@gmail.com',
							  to: user.email,
							  subject: 'password reset link',
							  html: 'Hey! '+user.name+'. <br>You have recently requested for setting a new password.The fowllowing is the link for changing password.<br><br><a href="http://localhost:8080/reset/'+user.resettoken+'">http://localhost:8080/reset/</a>',
							  text: 'Hey! '+user.name+'. <br>You have recently requested for setting a new password.The fowllowing is the link for changing password.<br><br><a href="http://localhost:8080/reset/'+user.resettoken+'">http://localhost:8080/reset/</a>'

							};

							transporter.sendMail(mailOptions, function(error, info){
							  if (error) {
							    console.log(error);
							  } else {
							    console.log('Email sent: ' + info.response);
							  }
							});

							res.json({success : true , message : 'Please check your mail for the link to change password'});						
						}


					})
				}				
			}
		});
	});


	router.get('/resetpassword/:token',function(req,res){
		User.findOne({resettoken : req.params.token }).select().exec(function(err,user){
			if (err) throw err;
			var token = req.params.token;
			jwt.verify(token,secret,function(err,decoded){
				if(err){
					res.json({success: false , message: 'Password link has expired'});
				}
				else{
					if(!user){
						res.json({success : false , message :'password link has expired' })
					}else{
						var mailOptions = {
							  from: 'travelworldwithme10@gmail.com',
							  to: user.email,
							  subject: 'Password reset success',
							  html: 'hey! '+user.name+',<br> Your password has been successfully reset at <a href="http://localhost:8080"> nevernotyet.com</a>',
							  text: 'hey! '+user.name+', Your password has been successfully reset at <a href="http://localhost:8080"> nevernotyet.com</a>'


							};

							transporter.sendMail(mailOptions, function(error, info){
							  if (error) {
							    console.log(error);
							  } else {
							    console.log('Email sent: ' + info.response);
							  }
							});
						res.json({success: true , user : user });
					}
					
				}
			});

		});
	});

	router.put('/savepassword',function(req,res){
		User.findOne({ email : req.body.email}).select('name email password resettoken mobile').exec(function(err,user){
			if(err) throw err;
			if(req.body.password == null || req.body.password == ''){
				res.json({success :  false , message : 'inavlid input'});
			}
			else{
				user.password = req.body.password;
				user.resettoken = null;
				user.save(function(err){
					if(err){
						res.json({ success : false , message : err });
					}else{

						res.json({ success: true , message : 'Your password has been reset!' });
					}
				});
			}
		});
	});
	

	router.use(function(req,res,next){
		var token=req.body.token || req.body.query || req.headers['x-access-token'];

		if(token){
			jwt.verify(token,secret,function(err,decoded){
				if(err){
					res.json({success: false , message: 'Invalid token'});
				}
				else{
					req.decoded=decoded;
					next();
				}
			});
		}else{
			res.json({success:false,message:'Please asd Provide token'});
		}
	});

	router.post('/me',function(req,res){
		res.send(req.decoded);
	});

	return router;
}