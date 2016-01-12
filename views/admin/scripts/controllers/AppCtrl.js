app.controller('AppCtrl', function($scope,$rootScope,$timeout, $stateParams,$state,User){

    // detect change in route
    $rootScope.$on("stateChangeSuccess", function (event, next, current) {
       
        if(User.isAuthenticated() && next.name!='login' && current.name != 'login')
        {
            console.warn('The user is not authorised');            
            $state.go('login');
        }
    });
    
    $rootScope.$on('$stateNotFound',
    function(event, unfoundState, fromState, fromParams){
        console.log('wsws' + unfoundState.to); // "lazy.state"
        console.log(unfoundState.toParams); // {a:1, b:2}
        console.log(unfoundState.options); // {inherit:false} + default options
    })
});
