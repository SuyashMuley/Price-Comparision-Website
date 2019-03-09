angular.module('authServices',[])

.factory('authentication',function($http,authToken){
	var authFactory={};
	authFactory.login=function(loginData){
		return $http.post('/api/authenticate',loginData).then(function(data){
			authToken.setToken(data.data.token);
			return data;
		});
	}
	authFactory.isLoggedIn=function(){
		if(authToken.getToken()){
			return true;
		}
		else{
			return false;
		}
	}

	authFactory.logout=function(){
		authToken.setToken();
	}

	authFactory.getUser=function(){
		if(authToken.getToken()){
			return $http.post('/api/me');
		}
		else{
			$q.reject({message:'User has no token'});
		}
	}

	return authFactory;

})

.factory('authToken',function($window){
	var authTokenFactory={};
	authTokenFactory.setToken=function(token){
		if(token){
			return $window.localStorage.setItem('token',token);
		}
		else{
			return $window.localStorage.removeItem('token');
		}
		
	}

	authTokenFactory.getToken=function(){
		return $window.localStorage.getItem('token');
	}
	return authTokenFactory;
})


.factory('authInterceptors',function(authToken){
	var authInterceptorsFactory={};
	authInterceptorsFactory.request=function(config){
		var token=authToken.getToken();
		if(token){
			config.headers['x-access-token']=token;
		}
		return config;
	}
	return authInterceptorsFactory;
});




