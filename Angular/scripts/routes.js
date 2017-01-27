angular.module('HousingApp', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('');
    $stateProvider
    .state('home', {
        url: "",
           views: {
            
            '':{
                templateUrl:"views/home.html"
            },
        
            'complexes@home': {
                templateUrl:"views/dashboard-complex.html"
            },
            'associates@home':{
                templateUrl:"views/dashboard-associates.html"
            }
        }
    })
    .state('associates', {
        url: "/associates",
        templateUrl: "views/associates.html",
    })
    .state('housing', {
        url: "/housing",
        templateUrl: "views/housing.html",
    })
    .state('analytics', {
        url: "/analytics",
        templateUrl: "views/analytics.html",
    });
});