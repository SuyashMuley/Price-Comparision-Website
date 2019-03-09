angular.module('userServices',[])

.factory('userCreate',function($http){
	userFactory={};
	userFactory.create=function(regData){
		return $http.post('/api/users',regData);
	};

	userFactory.checkEmail=function(regData){
		return $http.post('/api/checkemail',regData);
	}
	userFactory.checkMobile=function(regData){
		return $http.post('/api/checkmobile',regData);
	}
	userFactory.sendPassword=function(resetData){
		return $http.put('/api/resetpassword',resetData);
	}
	userFactory.resetPassword=function(token){
		return $http.get('/api/resetpassword/'+token);
	}
	userFactory.savePassword=function(newpswdData){
		return $http.put('/api/savepassword',newpswdData);
	}
	return userFactory;
});