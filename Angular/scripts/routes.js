angular.module('HousingApp', ['ui.router'])
.config(function ($stateProvider) {
    $stateProvider
    .state('home', {
        url: "",
           views: {
            
            '':{
                templateUrl:"views/home.html"
            },
        
            'complex@home': {
                templateUrl:"views/dashboard-complex.html"
            }
        },
    })
    .state('associates', {
        url: "/associates",
        templateUrl: "views/associates.html",
    })
    .state('housing', {
        url: "/housing",
        templateUrl: "views/housing.html",
    })
    .state('complex',{
        url:"/complex",
        views: {
            
            '':{
                templateUrl:"views/home.html"
            },
        
            'complex@complex': {
                templateUrl:"views/dashboard-complex.html"
            }
        }
      })
    .state('analytics', {
        url: "/analytics",
        templateUrl: "views/analytics.html",
    });
});