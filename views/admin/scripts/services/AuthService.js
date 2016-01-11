app.service('AuthService',function AuthService($q, $http, USER_ROLES,UserService,AppConfig)
    {
        var LOCAL_TOKEN_KEY = 'token';
        var LOCAL_ROLE_KEY = 'ROLE';
        var username = '';
        var isAuthenticated = false;
        var role = '';
        var authToken;

        var url='http://www.nestopia.com/auth/token';

        var login = function(name, pw)
        {
            console.log('Login Servcice called');
            return $q(function(resolve, reject)
            {
                $http.post(url,{'email':name,'password':pw,'role':'admin'}).success(function(data,status)
                {
                    console.log('Logged ' + JSON.stringify(data));
                storeUserCredentials(data.token,data.role,name);
                resolve("logged");

                }).error(function(err)
                {
                    console.error('Error in login ' + JSON.stringify(err));
                    reject(err);
                });

            });
        };
        var logout = function() {

            destroyUserCredentials();
        };

        function destroyUserCredentials()
        {
            authToken = undefined;
            username = '';
            isAuthenticated = false;
            UserService.isLogged=false;
            $http.defaults.headers.common['X-Auth-Token'] = undefined;
            $http.defaults.headers.common['token'] = undefined;
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
            //window.localStorage.removeItem('USERNAME');
        }

        function storeUserCredentials(token,role,uname)
        {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
            //window.localStorage.setItem('USERNAME',uname);
            window.localStorage.setItem(LOCAL_ROLE_KEY, USER_ROLES[role]);
            useCredentials(token,role);
        }

        function loadUserCredentials() {
            var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            var role = window.localStorage.getItem(LOCAL_ROLE_KEY);
            //username= window.localStorage.getItem('USERNAME');

            if (token && role) {
                useCredentials(token,role);
            }
        }
        function useCredentials(token,roleUser)
        {
            isAuthenticated = true;
            UserService.isLogged=true;

            authToken = token;
            role=roleUser;

            // Set the token as header for your requests!
            $http.defaults.headers.common['X-Auth-Token'] = token;
            $http.defaults.headers.common['token'] = token;
        }

        var isAuthorized = function(authorizedRoles)
        {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
        };

        loadUserCredentials();

        return {
            login: login,
            logout: logout,
            isAuthorized: isAuthorized,
            isAuthenticated: function() {return isAuthenticated;},
            username: function() {return username;},
            role: function() {return role;}
        };
    })

    .factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', function ($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized
                }[response.status], response);
                return $q.reject(response);
            },
            response:function(response)
            {

                return response || $q.when(response);
            }
        };
    }])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });
