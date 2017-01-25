angular.module('housing', ['ui.router'])
.config(function ($stateProvider) {
    $stateProvider
    .state('home', {
        url: "",
        templateUrl: "views/home.html",
    });
});