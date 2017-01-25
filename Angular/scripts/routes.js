angular.module('HousingApp', ['ui.router'])
.config(function ($stateProvider) {
    $stateProvider
    .state('home', {
        url: "",
        templateUrl: "views/home.html",
    })
    .state('associates', {
        url: "/associates",
        templateUrl: "views/associates.html",
    });
});