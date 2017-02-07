angular.module("HousingApp")
.controller("AssociatesCtrl", function($scope, $http, associatesURL) {
    var requestAssociate = new XMLHttpRequest();

    $scope.AssociateScope = [];
    $scope.AssociateScope.PageSize1 = 3;
    $scope.AssociateScope.PageSize2 = 9;
    $scope.AssociateScope.CurrentPage1 = 1;
    $scope.AssociateScope.CurrentPage2 = 1;
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

    $scope.AssociateScope.GoToPage = function (version, page) {
        if(version == $scope.AssociateScope.CurrentPage1)
        {
            $scope.AssociateScope.CurrentPage1 = page;
        }
        else
        {
            $scope.AssociateScope.CurrentPage2 = page;
        }
    }

    $scope.AssociateScope.GetPageClass = function (version, page) {
        if(version == $scope.AssociateScope.CurrentPage1)
        {
            return $scope.AssociateScope.CurrentPage1 == page ? "btn-revature" : "";
        }
        else
        {
            return $scope.AssociateScope.CurrentPage2 == page ? "btn-revature" : "";
        }
    }

    $scope.AssociateScope.ToggleFilters = function() {
        var filters = document.getElementById("associate-filters");
        var list = document.getElementById("associate-list");

        if(filters.style.height == "15em")
        {
            filters.style.height = "0em";
            updateSpacing(10, 0);
        }
        else if(filters.style.height == "0em")
        {
            filters.style.height = "15em";
            updateSpacing(10, 210);
        }
    }

    var updateSpacing = function (time, height) {
        setTimeout(function() {
            var content = document.getElementById("associate-content");
            var contentParent = content.parentElement;
            var spacing = contentParent.clientHeight;

            for (var i = 0; i < contentParent.children.length; i++)
            {
                if (contentParent.children[i] != content)
                {
                    if (contentParent.children[i].id != "associate-filters")
                    {
                        spacing -= contentParent.children[i].clientHeight;
                    }
                    else if (contentParent.children[i].id == "associate-filters" && height != 0) 
                    {
                        spacing -= height;
                    }
                }
            }
            
            content.style.height = spacing + "px";
        }, time);
    }

    updateSpacing(10, 0);
});