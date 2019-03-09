angular.module('addProductController',['addProductServices'])

.controller('addProductCtrl',function(addProducts){
    app=this;
    app.loading = false;
    app.successmessage = false;
    app.errormessage = false;
    this.addProducttodb=function(pdata){
        app.loading = true;
        addProducts.addProductindb(pdata).then(function(data){
            app.loading=false;
            if(data.data.success){
                app.successmessage = data.data.message;
            }else{
                app.errormessage = data.data.message;
            }
            
        });
    }
});