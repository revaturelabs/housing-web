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
.filter('hasKeys', function() {
    return function(x) {
        var result = [];
        var count = 0;
        
        x.forEach(function(element) {
            if(!element.HasKeys)
            {
                result[count] = element;
                count++;
            }
        }, this);
        return result;
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

    $scope.toggleFilters = function() {
        var filters = document.getElementById("associate-filters");
        var list = document.getElementById("associate-list");

        if(filters.style.height == "15em")
        {
            filters.style.height = "0em";
            list.style.height = "37em";
        }
        else if(filters.style.height == "0em")
        {
            filters.style.height = "15em";
            list.style.height = "22em";
        }
    }
});