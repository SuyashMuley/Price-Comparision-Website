angular.module('addProductServices',[])

.factory('addProducts',function($http){
    var addProductFactory = {};

    addProductFactory.addProductindb=function(pdata){
        return $http.post('/productsapi/addproducts',pdata);
    }

    return addProductFactory;
});