var express			=	require('express');
var app 			=	express();
var port 			=	process.env.PORT||8080;
var morgan 			=	require('morgan');
var mongoose 		=	require('mongoose');
var bodyParser 		=	require("body-parser");
var router 			= 	express.Router();
var appRoutes 		=	require('./app/routes/api')(router);
var productRouter 	=  	require('./app/routes/products')(router);
var path 			=	require('path');
var mysql 			=	require('mysql');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname+'/public'));
app.use('/api',appRoutes);
app.use('/productsapi',productRouter);


mongoose.connect('mongodb://localhost:27017/meantutorial',function(err,db){
	if(err){
		console.log("Failed to connect to mongodb");
	}
	else{
		console.log("succesfully connected to mongodb");
	}
});
app.get('*',function(req,res){
	res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
});
app.listen(port,function(){
	console.log("server running on port "+port);
});