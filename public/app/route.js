var app = angular.module('appRoute',['ngRoute']).config(function($routeProvider,$locationProvider){
	$routeProvider
	.when('/',{
		templateUrl		:'app/views/pages/home.html'
	})
	.when('/about',{
		templateUrl		:'app/views/pages/about.html'
	})
	.when('/register',{
		templateUrl		:"app/views/pages/users/register.html",
		controller 		:'regCtrl',
		controllerAs 	:'register',
		authenticated 	: false
	})
	.when('/profile',{
		templateUrl 	:'app/views/pages/users/profile.html',
		authenticated 	: true

	})
	.when('/forgotpassword',{
		templateUrl		: 'app/views/pages/users/reset/forgotpassword.html',
		controller 		: 'passwordCtrl',
		controllerAs 	: 'password',
		authenticated	: false
	})
	.when('/reset/:token',{
		templateUrl 	: 'app/views/pages/users/reset/newpassword.html',
		controller 		: 'resetCtrl',
		controllerAs 	: 'reset',
		authenticated 	: false
	})
	.when('/addProduct',{
		templateUrl		: 'app/views/pages/products/addProduct.html',
		controller 		: 'addProductCtrl',
		controllerAs 	: 'addProduct'
	})
	.when('/wishlist',{
		templateUrl 	: 'app/views/pages/users/wishlist.html',
		authenticated 	: true
	})
	.when("/mensfashion",{
		templateUrl		: 'app/views/pages/categories/mens/index.html'
	})
	.when("/womensfashion",{
		templateUrl		: 'app/views/pages/categories/womens/index.html'
	})
	.when("/books",{
		templateUrl		: 'app/views/pages/categories/books/index.html'
	})
	.when("/sportsandfitness",{
		templateUrl		: 'app/views/pages/categories/sports/index.html'
	})
	.when("/laptopsandcomputers",{
		templateUrl		: 'app/views/pages/categories/laptops/index.html'
	})
	
	.otherwise({redirectTo:'/'});


	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
	});

});

app.run(['$rootScope','authentication','$location',function($rootScope,authentication,$location){
	$rootScope.$on('$routeChangeStart',function(event,next,current){
			if(next.$$route.authenticated==true){
				if(!authentication.isLoggedIn()){
					event.preventDefault();
					$location.path('/')
				}
			}
			else if(next.$$route.authenticated == false){
				if(authentication.isLoggedIn()){
					event.preventDefault();
					$location.path('/');
				}
			}
	});
}]);