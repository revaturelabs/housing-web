angular.module("HousingApp")
.controller("AssociatesCtrl", function($scope, $http, associatesURL) {
    var requestAssociate = new XMLHttpRequest();

    $scope.AssociateScope = [];
    $scope.AssociateScope.PageSize = 3;
    $scope.AssociateScope.CurrentPage = 1;
    $scope.AssociateScope.LastPage = 1;
    $scope.AssociateScope.CurrentAssociate = [];
    $scope.AssociateScope.Associates = [];
    $scope.AssociateScope.Search = {
        Associate: ""
    };

    requestAssociate.onreadystatechange = function () {
        if(requestAssociate.readyState == 4 && requestAssociate.status == 200) {
            $scope.AssociateScope.Associates = JSON.parse(requestAssociate.responseText);
        }
    }

    requestAssociate.open("GET", associatesURL, false);
    requestAssociate.send();

    $scope.AssociateScope.UpdatePageList = function (size)
    {
        $scope.AssociateScope.PageSize = size;
        $scope.AssociateScope.CurrentPage = 1;
        setTimeout(function() {
            $scope.AssociateScope.LastPage = getLastIndex();
        }, 20);
    }

    $scope.AssociateScope.GoToPage = function (page) {
        if(page >= 1 && page <= $scope.AssociateScope.LastPage)
        {
            $scope.AssociateScope.CurrentPage = page;
        }
    }

    $scope.AssociateScope.GetPageClass = function (page) {
        return $scope.AssociateScope.CurrentPage == page ? "btn-revature" : "";
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

    var getLastIndex = function()
    {
        var pagin = document.getElementById("associate-pagination");
        var pages = pagin.children[0].children[0].children;
        var count = pages.length - 2;

        return count;
    }

    updateSpacing(10, 0);

    setTimeout(function() {
        $scope.AssociateScope.LastPage = getLastIndex();
    }, 20);
});