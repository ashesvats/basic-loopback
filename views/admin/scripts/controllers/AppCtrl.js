app.controller('AppCtrl', function($scope,$rootScope,$timeout, $stateParams,$state,User){

    // detect change in route
    $rootScope.$on("$stateChangeStart", function (event, next, current) {

        if(!User.isAuthenticated() && next.name!='login' && current.name != 'login')
        {
            console.log('User not autharised2' + JSON.stringify(next));
            //User.logout();

        }
    });
});
