angular.module("HousingApp")
.constant("associatesURL", "fakedata/Associates.json")
.controller("AssociatesCtrl", function($scope, $http, associatesURL) {
    var request = new XMLHttpRequest();
    $scope.pageSize = 3;
    $scope.selectedPage = 1;
    $scope.associates = [];
    $scope.AssociateFilters = {
        srcChoice: "name",
        srcString: "",
        radTech: "all",
        radGender: "all",
        radCar: "all"
    };

    $scope.selectPage = function (newPage) {
        $scope.selectedPage = newPage;
    }

    $scope.getPageClass = function (page) {
        return $scope.selectedPage == page ? "btn-revature" : "";
    }

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