var app=angular.module('myApp',['lbServices']);

app.config(function(LoopBackResourceProvider,$httpProvider) {

    // Use a custom auth header instead of the default 'Authorization'
    LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase('http://0.0.0.0:3000/api');

    // Inside app config block
    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
        return {
            responseError: function(rejection) {
                if (rejection.status == 401) {
                    //Now clearing the loopback values from client browser for safe logout...
                    LoopBackAuth.clearUser();
                    LoopBackAuth.clearStorage();
                    $location.nextAfterLogin = $location.path();
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        };
    });
});

    app.controller('TestCtrl', function($scope, User, $location) {
    $scope.login = function () {

    };
        $scope.test=function()
        {
            User.login({username:'ashes',password:"test"},function(data){
                console.log(data);
            },function(err){
                console.log(err);
            })
        }
});