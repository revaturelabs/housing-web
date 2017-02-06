angular.module("HousingApp")
.controller("AssociatesCtrl", function($scope, $http, associatesURL) {
    var requestAssociate = new XMLHttpRequest();

    $scope.AssociateScope = [];
    $scope.AssociateScope.PageSize = 3;
    $scope.AssociateScope.CurrentPage = 1;
    $scope.AssociateScope.Associates = [];
    $scope.AssociateScope.AssociateFilters = {
        SrcChoice: "name",
        SrcString: "",
        RadTech: "all",
        RadGender: "all",
        RadCar: "all"
    };

    requestAssociate.onreadystatechange = function () {
        if(requestAssociate.readyState == 4 && requestAssociate.status == 200) {
            $scope.AssociateScope.Associates = JSON.parse(requestAssociate.responseText);
        }
    }

    requestAssociate.open("GET", associatesURL, false);
    requestAssociate.send();

    $scope.AssociateScope.GoToPage = function (page) {
        $scope.AssociateScope.CurrentPage = page;
    }

    $scope.AssociateScope.GetPageClass = function (page) {
        return $scope.AssociateScope.CurrentPage == page ? "btn-revature" : "";
    }

    $scope.AssociateScope.ToggleFilters = function() {
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