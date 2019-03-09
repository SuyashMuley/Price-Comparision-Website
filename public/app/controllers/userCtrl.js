angular.module('userController',['userServices'])
.controller('regCtrl',function($http,$location,$timeout, userCreate, $window){
	app=this;
	this.regUser=function(regData,valid){
		app.errormessage=false;
		app.successmessage=false;
		app.loading=true;
		if(valid){
			console.log('Data submitted');
			userCreate.create(regData).then(function(data){
				if(data.data.success){
					app.loading=false;
					app.successmessage=data.data.message;
					$timeout(function(){
						$window.location.reload();
						
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
			app.errormessage='Please Ensure form is filled properly';
		}
	};

	this.checkMail=function(regData){
		app.emailerrormsg=false;
		app.emailinvalid=false;

		userCreate.checkEmail(regData).then(function(data){
			if(data.data.success){
				app.emailerrormsg=true;
				app.emailinvalid=false;
				app.emailerrormsg=data.data.message;
			}
			else{
				app.emailerrormsg=true;
				app.emailinvalid=true;
				app.emailerrormsg=data.data.message;

			}

		});
	};


	this.checkPhone=function(regData){
		app.phoneerrormsg=false;
		app.phoneinvalid=false;

		userCreate.checkMobile(regData).then(function(data){
			if(data.data.success){
				app.phoneerrormsg=true;
				app.phoneinvalid=false;
				app.phoneerrormsg=data.data.message;
			}
			else{
				app.phoneerrormsg=true;
				app.phoneinvalid=true;
				app.phoneerrormsg=data.data.message;
			}

			

		});
	};
});