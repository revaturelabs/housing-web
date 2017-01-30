angular.module("HousingApp")
.controller("DashboardCtrl", function($scope, $http) {
    $scope.expandView = function() {
        var sections = document.getElementsByTagName("section");
        var section1;
        var section2;

        for(var i = 0; i < sections.length; i++)
        {
            if(sections[i].id.includes("dashboard"))
            {
                if(sections[i].classList.contains("expanded"))
                {
                    section1 = sections[i];
                }
                else
                {
                    section2 = sections[i];
                }
            }
        }

        section1.classList.remove("col-md-8");
        section1.classList.remove("expanded");
        section2.classList.remove("col-md-4");

        section2.classList.add("col-md-8");
        section2.classList.add("expanded");
        section1.classList.add("col-md-4");

        var divcolumns = document.querySelectorAll('div[class^="col-md-"]');

        for(var i = 0; i < divcolumns.length; i++) {
            if(divcolumns[i].classList.contains("col-md-9"))
            {
                divcolumns[i].classList.remove("col-md-9");
                divcolumns[i].classList.add("col-md-6");
            }
            else if (divcolumns[i].classList.contains("col-md-3"))
            {
                divcolumns[i].classList.remove("col-md-3");
                divcolumns[i].classList.remove("filter-search");
                divcolumns[i].classList.add("col-md-6");
                divcolumns[i].classList.add("filter-search");
            }
            else if (divcolumns[i].classList.contains("col-md-4"))
            {
                divcolumns[i].classList.remove("col-md-4");
                divcolumns[i].classList.remove("ng-scope");
                divcolumns[i].classList.add("col-md-12");
                divcolumns[i].classList.add("ng-scope");
            }
            else if(divcolumns[i].classList.contains("col-md-6") && !divcolumns[i].classList.contains("filter-search"))
            {
                divcolumns[i].classList.remove("col-md-6");
                divcolumns[i].classList.add("col-md-9");
            }
            else if (divcolumns[i].classList.contains("col-md-6") && divcolumns[i].classList.contains("filter-search"))
            {
                divcolumns[i].classList.remove("col-md-6");
                divcolumns[i].classList.remove("filter-search");
                divcolumns[i].classList.add("col-md-3");
                divcolumns[i].classList.add("filter-search");
            }
            else if (divcolumns[i].classList.contains("col-md-12"))
            {
                divcolumns[i].classList.remove("col-md-12");
                divcolumns[i].classList.remove("ng-scope");
                divcolumns[i].classList.add("col-md-4");
                divcolumns[i].classList.add("ng-scope");
            }
        }
    }
});