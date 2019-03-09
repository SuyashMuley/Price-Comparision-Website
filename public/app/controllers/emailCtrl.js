angular.module('emailController',['userServices'])

.controller('passwordCtrl',function(userCreate){
	app=this;
	app.notdisable=true;

	this.sendPassword=function(resetData,valid){
		app.errormessage=false;
		app.successmessage=false;
		app.loading=true;
		if(valid){
			userCreate.sendPassword(app.resetData).then(function(data){
				app.loading=false;
				if(data.data.success){
					app.notdisable=false
					app.successmessage=data.data.message;
				}
				else{
					app.errormessage=data.data.message;
				}
			});
		}else{
			app.loading=false;
			app.errormessage='please provide a valid e-mail';
		}
	}
})

.controller('resetCtrl',function($routeParams,userCreate,$scope,$timeout,$window,$location){
	app=this;
	app.hide=true;
	app.disable=false;
	userCreate.resetPassword($routeParams.token).then(function(data){
		if(data.data.success==true){
			app.hide=false;
			$scope.email=data.data.user.email;

		}
		else{
			app.errormessage=data.data.message;
		}
	});
	app.savePassword=function(newpswdData,valid){
		app.loading=true;
		newpswdData.email=$scope.email;
		if(valid){
			userCreate.savePassword(newpswdData).then(function(data){
				if(data.data.success==true){
					app.disable=true;
					app.loading=false;
					app.successmessage = data.data.message;
					$timeout(function(){
						$window.location.reload();
						$location.path('/login');
					},2000);
				}
				else{
					app.loading=false;
					app.errormessage=data.data.message;
				}
			});

		}
		else{
			app.loading=false;
			app.errormessage='Ensure that form is filled properly';
		}
	}
});
