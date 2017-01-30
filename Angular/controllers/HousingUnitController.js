angular.module('HousingApp')
.constant("unitsURL", "fakedata/HousingUnits.json")
.controller('UnitCtrl', function($scope, $http, unitsURL){
    var request = new XMLHttpRequest();
    $scope.units = [];

    request.onreadystatechange = function () {
        if(request.readyState == 4 && request.status == 200) {
            $scope.units = JSON.parse(request.responseText);
        }
    }

    request.open("GET", unitsURL, false);
    request.send();
});