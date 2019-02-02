var app = angular.module('myApp', ['ngRoute']);
            // configure our routes
            app.config(function($routeProvider) {
                $routeProvider
                    // route for the home page
                    .when('/', {
                        controller  : 'MainController',
						templateUrl : 'pages/home.html'
                    })
					.otherwise({
						redirectTo: '/'
					});
            });