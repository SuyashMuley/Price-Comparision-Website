angular.module("userApp",['appRoute','userController','userServices','mainController','authServices','emailController','addProductController','addProductServices'])
.config(function($httpProvider){
	$httpProvider.interceptors.push('authInterceptors');
});