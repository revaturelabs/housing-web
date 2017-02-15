angular.module('HousingApp', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('');
    $stateProvider
    .state('home', {
        url: "",
        views: {
            '': {
                controller: "DashboardCtrl",
                templateUrl: "views/home.html"
            },
            'units@home': {
                templateUrl: "views/dashboard-housing.html"
            },
            'associates@home': {
                templateUrl: "views/dashboard-associates.html"
            }
        }
    })
    .state('associates', {
        url: "/associates/",
        controller: "AssociatesCtrl",
        templateUrl: "views/associates.html",
    })
    .state('housing', {
        url: "/housing/",
        controller: "HousingCtrl",
        templateUrl: "views/housing.html"
    })
    .state('housing-unit', {
        url: "/housing/{Name}",
        controller: "HousingCtrl",
        templateUrl: "views/housing-unit.html"
    })
    .state('analytics', {
        url: "/analytics/",
        templateUrl: "views/analytics.html",
    });
    
});