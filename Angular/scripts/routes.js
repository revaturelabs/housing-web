angular.module('HousingApp', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('');
    $stateProvider
    .state('home', {
        url: "",
        views: {
            '': {
                controller: "DashboardCtrl",
                templateUrl: "views/home.html"
            },
            'complexes@home': {
                controller: "ComplexCtrl",
                templateUrl: "views/dashboard-complex.html"
            },
            'units@home': {
                controller: "UnitCtrl",
                templateUrl: "views/dashboard-complex.html"
            },
            'associates@home': {
                controller: "AssociatesCtrl",
                templateUrl: "views/dashboard-associates.html"
            }
        }
    })
    .state('associates', {
        url: "/associates",
        controller: "AssociatesCtrl",
        templateUrl: "views/associates.html",
    })
    .state('housing', {
        url: "/housing",
        controller: "ComplexCtrl",
        templateUrl: "views/housing.html",
    })
    .state('analytics', {
        url: "/analytics",
        templateUrl: "views/analytics.html",
    });
});