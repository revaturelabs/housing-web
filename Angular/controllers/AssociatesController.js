angular.module("HousingApp")
.controller("AssociatesCtrl", function($scope, $rootScope, $http, associatesURL) {
    var requestAssociate = new XMLHttpRequest();

    $scope.AssociateScope = [];
    $scope.AssociateScope.PageSize1 = 3;
    $scope.AssociateScope.PageSize2 = 9;
    $scope.AssociateScope.CurrentPage1 = 1;
    $scope.AssociateScope.CurrentPage2 = 1;
    $scope.AssociateScope.CurrentAssociate = [];
    $scope.AssociateScope.SelectedAssociates = [];
    $scope.AssociateScope.LastPage1 = 1;
    $scope.AssociateScope.LastPage2 = 1;
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
    
    $rootScope.$on("UpdateAssociateList", function(event, size, mode){
        $scope.AssociateScope.UpdatePageList(size, mode);
    });

    $rootScope.$on("RequestSelection", function(event){
        $rootScope.$broadcast('GetSelection', $scope.AssociateScope.SelectedAssociates);
    });

    $rootScope.$on("ResetSelection", function(event){
        var list = document.getElementById("associate-list");
        var children = list.children;

        for(var i = 0; i < children.length; i++)
        {
            if(children[i].firstElementChild.firstElementChild.classList.contains("selected"))
            {
                children[i].firstElementChild.firstElementChild.classList.remove("selected");
            }
        }
    });

    $scope.AssociateScope.UpdatePageList = function (size, mode)
    {
        if(mode == 1)
        {
            $scope.AssociateScope.PageSize1 = size;
            $scope.AssociateScope.CurrentPage1 = 1;
            setTimeout(function() {
                $scope.AssociateScope.LastPage1 = getLastIndex();
            }, 20);
        }
        else if(mode == 2)
        {
            $scope.AssociateScope.PageSize2 = size;
            $scope.AssociateScope.CurrentPage2 = 1;
            setTimeout(function() {
                $scope.AssociateScope.LastPage2 = getLastIndex();
            }, 20);
        }
    }

    $scope.AssociateScope.UpdateContentClass = function (size)
    {
        return size == 9 ? "col-md-12" : "col-md-4";
    }

    $scope.AssociateScope.GoToPage = function (version, page) {
        if(version == 1 && (page >= 1 && page <= $scope.AssociateScope.LastPage1))
        {
            $scope.AssociateScope.CurrentPage1 = page;
        }
        else if(version == 2 && (page >= 1 && page <= $scope.AssociateScope.LastPage2))
        {
            $scope.AssociateScope.CurrentPage2 = page;
        }
    }

    $scope.AssociateScope.GetPageClass = function (version, page) {
        if(version == 1)
        {
            return $scope.AssociateScope.CurrentPage1 == page ? "btn-revature" : "";
        }
        else if(version == 2)
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

    $scope.AssociateScope.SelectPerson = function(event, person)
    {
        var list = document.getElementById("associate-list");
        var children = list.children;
        if(children[0].classList.contains("col-md-4"))
        {
            if(event.currentTarget.classList.contains("selected"))
            {
                event.currentTarget.classList.remove("selected");
            }
            else
            {
                event.currentTarget.classList.add("selected");
            }
            $scope.AssociateScope.SelectedAssociates.push(person);
        }
    }

    $scope.AssociateScope.GetCurrentAssociate = function (person) {
        $scope.AssociateScope.CurrentAssociate = person;
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
        $scope.AssociateScope.LastPage1 = getLastIndex();
        $scope.AssociateScope.LastPage2 = getLastIndex();
    }, 20);
});