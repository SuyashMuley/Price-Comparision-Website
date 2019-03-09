angular.module('mainController',['authServices'])
.controller('mainCtrl',function(authentication,$location,$timeout,authToken,$rootScope,$window){
	app=this;
	showModal = function(option){
		if(option == 'logout'){
			$("#myModal").modal({backdrop:'static'});
			app.modalHeader='Never-Not-Yet';
			app.modalBody='Logging out... Happy to have you on our site :) :)';
		}
		else if(option == 'login'){
			$("#loginModal").modal({backdrop:'static'});
		}
	}
	hideModal=function(option){
		if(option == 'logout'){
			$("#myModal").modal('hide');
		}else if(option=='login'){
			$("#loginModal").modal('hide');
		}
	}


	$rootScope.$on('$routeChangeStart',function(){
		if(authentication.isLoggedIn()){
			app.loginButton=false;
			app.logoutButton=true;
			app.wishlistButton=true;
			authentication.getUser().then(function(data){
				app.username=data.data.name;
				app.useremail=data.data.email;
				app.usermobile=data.data.mobile;
				console.log('User logged in is '+app.username);
			});
		}
		else{
			console.log('No user logged ');
			app.logoutButton=false;
			app.loginButton=true;
			app.userButton=false;
			app.wishlistButton=false;
		}
	});


	this.loginModal=function(){
		showModal('login');
	};

	this.hideModalWhenNotLogin=function(){
		hideModal('login');
	}


	this.login=function(loginData){
		app.errormessage=false;
		app.successmessage=false;
		app.loading=true;
		console.log('Data submitted');
		authentication.login(loginData).then(function(data){
			if(data.data.success){
				app.loading=false;
				app.successmessage=data.data.message;
				
				$timeout(function(){
					app.successmessage=false;
					$window.location.reload();
					hideModal('login');
				},2000);
				
				app.loginButton=false;
				app.logoutButton=true;
			}
			else{
				app.loading=false;
				app.errormessage=data.data.message;
			}
		});
	};
	this.logout=function(){
		showModal('logout');
		authentication.logout();
		app.logoutButton=false;
		app.loginButton=true;
		console.log('user logged out');
		$timeout(function() {
			hideModal('logout');
		}, 2000);
		$timeout(function() {
			$location.path('/home');
		}, 2000);
	};
	
});