angular.module("HousingApp")
.constant("complexURL", "fakedata/HousingComplexes.json")
.constant("dataURL", "fakedata/HousingData.json")
.constant("unitURL", "fakedata/HousingUnits.json")
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
.controller("HousingCtrl", function($scope, $http, complexURL, dataURL, unitURL) {
    var request1 = new XMLHttpRequest();
    var request2 = new XMLHttpRequest();
    var request3 = new XMLHttpRequest();
    $scope.units = [];
    $scope.data = [];
    $scope.complexes = [];

    request1.onreadystatechange = function () {
        if(request1.readyState == 4 && request1.status == 200) {
            $scope.units = JSON.parse(request1.responseText);
        }
    }

    request2.onreadystatechange = function () {
        if(request2.readyState == 4 && request2.status == 200) {
            $scope.data = JSON.parse(request2.responseText);
        }
    }
    
    request3.onreadystatechange = function () {
        if(request3.readyState == 4 && request3.status == 200) {
            $scope.complexes = JSON.parse(request3.responseText);
        }
    }

    request1.open("GET", unitURL, false);
    request2.open("GET", dataURL, false);
    request3.open("GET", complexURL, false);
    request1.send();
    request2.send();
    request3.send();

    $scope.units.forEach(function(element1) {
        var currentCap = 0;
        $scope.data.forEach(function(element2) {
            if(element2.HousingUnit.AptNumber == element1.AptNumber && element2.HousingUnit.Complex.Name == element1.Complex.Name)
            {
                currentCap++;
            }
        }, this);
        element1['Capacity'] = currentCap;
    }, this);

    $scope.toggleFilters = function() {
        var filters = document.getElementById("housing-filters");
        var list = document.getElementById("housing-list");

        if(filters.style.height == "5em")
        {
            filters.style.height = "0em";
            list.style.height = "37em";
        }
        else if(filters.style.height == "0em")
        {
            filters.style.height = "5em";
            list.style.height = "32em";
        }
    }
});
