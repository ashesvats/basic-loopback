app.config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
        debug:false,
        events:true,
    });
    $stateProvider
        .state('user', {
            url:'/user',
            templateUrl: 'views/user/main.html',
            onEnter:function()
            {

            }
        })
        .state('user.home',{
            url:'/home',
            templateUrl:'views/user/index.html',
            conntroller:'UserCtrl',
             resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'adminApp',
                        files:[
                            'scripts/controllers/UserCtrl.js',
                        ]
                    })
                }
            },
            onEnter:function()
            {
              console.log("Inside User.Home Controller");
            }
        })
 }]);