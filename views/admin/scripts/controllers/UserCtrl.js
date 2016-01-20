app.controller('UserCtrl', function($scope,$rootScope,$timeout, $stateParams,$state,User){
    
    getUsers();
    
    $scope.test=function()
    {
      console.log('User controller called');  
    };
    
    function getUsers()
    {
        console.log(User.find());
    }
});
