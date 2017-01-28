angular.module("HousingApp")
.constant("complexesURL", "fakedata/HousingComplexes.json")
.filter('address', function() {
    return function(x) {
        for (var i = 0; i < x.length; i++) {
            if (x[i] === ',') {
                var start = x.slice(0, i);
                var end = x.slice(i+2);
                x = start + '\n' + end;
                i = x.length;
            }
        }
        return x;
    }
})
.controller("ComplexCtrl", function($scope, $http, complexesURL) {
    var request = new XMLHttpRequest();
    $scope.complexes = [];

    request.onreadystatechange = function () {
        if(request.readyState == 4 && request.status == 200) {
            $scope.complexes = JSON.parse(request.responseText);
        }
    }

    request.open("GET", complexesURL, false);
    request.send();

    console.log($scope.complexes);
});
