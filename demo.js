var express			=	require('express');
var app 			=	express();
var mongoose 		=	require('mongoose');
var port 			=	process.env.PORT||8080;


mongoose.connect('mongodb://localhost:27017/meantutorial',function(err,db){
	if(err){
		console.log("Failed to connect to mongodb");
	}
	else{
		console.log("succesfully connected to mongodb");
	}
});



app.listen(port,function(){
	console.log("server running on port "+port);
});