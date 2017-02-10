angular.module("HousingApp")
.controller("DashboardCtrl", function($scope, $rootScope, $http, $state) {
    $scope.DashboardScope = [];

    $scope.$on("ExpandView", function(event){
        console.log("Recieved ExpandView Call!");
        $scope.DashboardScope.ExpandView();
    });

    $scope.DashboardScope.ExpandView = function() {
        console.log("Performing ExpandView Call...");
        var sections = document.getElementsByTagName("section");
        var section1;
        var section2;
        console.log(sections);
        for(var i = 0; i < sections.length; i++)
        {
            if(sections[i].id.includes("dashboard-left") || sections[i].id.includes("dashboard-right"))
            {
                if(sections[i].classList.contains("expanded"))
                {
                    section1 = sections[i];
                    $rootScope.$emit("UpdateHousingList", 3, 3);
                    $rootScope.$emit("UpdateAssociateList", 9, 2);
                }
                else
                {
                    section2 = sections[i];
                    $rootScope.$emit("UpdateHousingList", 1, 3);
                    $rootScope.$emit("UpdateAssociateList", 24, 2);
                }
            }
        }

        section1.classList.remove("col-md-8");
        section1.classList.remove("expanded");
        section2.classList.remove("col-md-4");

        section2.classList.add("col-md-8");
        section2.classList.add("expanded");
        section1.classList.add("col-md-4");

        var checkParent = function (child, parent)
        {
            var newParent = child.parentNode;
            while (newParent != null)
            {
                if (newParent == parent)
                {
                    return true;
                }
                newParent = newParent.parentNode;
            }
            return false;
        }

        var hfilters = document.getElementById("housing-filters");
        var afilters = document.getElementById("associate-filters");
        var divcolumns = document.querySelectorAll('div[class^="col-md-"]');
        var housinglist = document.getElementById("housing-list");
        var associatelist = document.getElementById("associate-list");

        for(var i = 0; i < divcolumns.length; i++)
        {
            if (divcolumns[i].classList.contains("col-md-4") && (checkParent(divcolumns[i], housinglist) || checkParent(divcolumns[i], associatelist)))
            {
                divcolumns[i].classList.remove("col-md-4");
                divcolumns[i].classList.remove("ng-scope");
                divcolumns[i].classList.add("col-md-12");
                divcolumns[i].classList.add("ng-scope");
            }
            else if (divcolumns[i].classList.contains("col-md-12") && (checkParent(divcolumns[i], housinglist) || checkParent(divcolumns[i], associatelist)))
            {
                divcolumns[i].classList.remove("col-md-12");
                divcolumns[i].classList.remove("ng-scope");
                divcolumns[i].classList.add("col-md-4");
                divcolumns[i].classList.add("ng-scope");
            }
        }
        
        if (hfilters.childNodes[1].childNodes[1].childNodes[1].classList.contains("col-md-offset-6"))
        {
            hfilters.childNodes[1].style.width = "23.75em";
            hfilters.childNodes[1].style.margin = "0em 1em";
            hfilters.childNodes[1].childNodes[1].childNodes[1].classList.remove("col-md-offset-6");
            hfilters.childNodes[1].childNodes[1].childNodes[1].classList.remove("col-md-6");
            hfilters.childNodes[1].childNodes[1].childNodes[1].classList.add("col-md-12");
            for (var i = 0; i < 3; i++)
            {
                hfilters.childNodes[1].childNodes[3].childNodes[(i * 2 + 1)].classList.remove("col-md-2");
                hfilters.childNodes[1].childNodes[3].childNodes[(i * 2 + 1)].classList.add("col-md-4");
            }
        }
        else
        {
            hfilters.childNodes[1].style.width = "56em";
            hfilters.childNodes[1].style.margin = "0em 1em";
            hfilters.childNodes[1].childNodes[1].childNodes[1].classList.remove("col-md-12");
            hfilters.childNodes[1].childNodes[1].childNodes[1].classList.add("col-md-6");
            hfilters.childNodes[1].childNodes[1].childNodes[1].classList.add("col-md-offset-6");
            for (var i = 0; i < 3; i++)
            {
                hfilters.childNodes[1].childNodes[3].childNodes[(i * 2 + 1)].classList.remove("col-md-4");
                hfilters.childNodes[1].childNodes[3].childNodes[(i * 2 + 1)].classList.add("col-md-2");
            }
        }
        
        if (afilters.childNodes[1].childNodes[1].childNodes[1].classList.contains("col-md-offset-6"))
        {
            afilters.childNodes[1].style.width = "23.75em";
            afilters.childNodes[1].style.margin = "0em 1em";
            afilters.childNodes[1].childNodes[1].childNodes[1].classList.remove("col-md-offset-6");
            afilters.childNodes[1].childNodes[1].childNodes[1].classList.remove("col-md-6");
            afilters.childNodes[1].childNodes[1].childNodes[1].classList.add("col-md-12");
            for (var i = 0; i < 3; i++)
            {
                afilters.childNodes[1].childNodes[3].childNodes[(i * 2 + 1)].classList.remove("col-md-2");
                afilters.childNodes[1].childNodes[3].childNodes[(i * 2 + 1)].classList.add("col-md-4");
            }
        }
        else
        {
            afilters.childNodes[1].style.width = "56em";
            afilters.childNodes[1].style.margin = "0em 1em";
            afilters.childNodes[1].childNodes[1].childNodes[1].classList.remove("col-md-12");
            afilters.childNodes[1].childNodes[1].childNodes[1].classList.add("col-md-6");
            afilters.childNodes[1].childNodes[1].childNodes[1].classList.add("col-md-offset-6");
            for (var i = 0; i < 3; i++)
            {
                afilters.childNodes[1].childNodes[3].childNodes[(i * 2 + 1)].classList.remove("col-md-4");
                afilters.childNodes[1].childNodes[3].childNodes[(i * 2 + 1)].classList.add("col-md-2");
            }
        }
    }
});