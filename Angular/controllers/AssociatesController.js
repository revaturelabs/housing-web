angular.module("HousingApp")
.constant("associatesURL", "fakedata/Associates.json")
.filter('date', function() {
    return function(x) {
        var txt = x.slice(4,6) + "/" + x.slice(6,8) + "/" + x.slice(0,4);
        return txt;
    }
})
.filter('bool', function() {
    return function(x) {
        var txt = "";
        if (x) {
            txt = "Yes";
        }
        else {
            txt = "No";
        }
        return txt;
    }
})
.controller("AssociatesCtrl", function($scope, $http, associatesURL) {
    var request = new XMLHttpRequest();
    $scope.associates = [];

    request.onreadystatechange = function () {
        if(request.readyState == 4 && request.status == 200) {
            $scope.associates = JSON.parse(request.responseText);
        }
    }

    request.open("GET", associatesURL, false);
    request.send();

    console.log($scope.associates);
});