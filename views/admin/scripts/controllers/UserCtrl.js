app.controller('UserCtrl', function($scope,$rootScope,$timeout, $stateParams,$state,User){

    $scope.test=function()
    {
      console.log('User controller called');  
    };
});
