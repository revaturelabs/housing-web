angular.module("HousingApp")
.controller("HousingCtrl", function($scope, $rootScope, $http, $stateParams, complexURL, dataURL, unitURL) {
    var requestComplex = new XMLHttpRequest();
    var requestData = new XMLHttpRequest();
    var requestUnit = new XMLHttpRequest();

    $scope.HousingScope = [];
    $scope.HousingScope = [];
    $scope.HousingScope.PageSize1 = 3;
    $scope.HousingScope.PageSize2 = 3;
    $scope.HousingScope.PageSize3 = 3;
    $scope.HousingScope.CurrentPage1 = 1;
    $scope.HousingScope.CurrentPage2 = 1;
    $scope.HousingScope.CurrentPage3 = 1;
    $scope.HousingScope.CurrentHousing = {};
    $scope.HousingScope.CurrentUnit = {};
    $scope.HousingScope.LastPage1 = 1;
    $scope.HousingScope.LastPage2 = 1;
    $scope.HousingScope.LastPage3 = 1;
    $scope.HousingScope.SelectedAssociates = [];
    $scope.HousingScope.CurrentComplex = $stateParams.Name;
    $scope.HousingScope.CurrentUnits = [];
    $scope.HousingScope.Units = [];
    $scope.HousingScope.Data = [];
    $scope.HousingScope.Complexes = [];
    $scope.HousingScope.HousingFilters = {
        SrcChoice: "name",
        SrcString: "",
        RadTech: "all",
        RadGender: "all",
        RadCar: "all",
        Current: ""
    };

    requestComplex.onreadystatechange = function () {
        if(requestComplex.readyState == 4 && requestComplex.status == 200) {
            $scope.HousingScope.Complexes = JSON.parse(requestComplex.responseText);
        }
    }

    requestData.onreadystatechange = function () {
        if(requestData.readyState == 4 && requestData.status == 200) {
            $scope.HousingScope.Data = JSON.parse(requestData.responseText);
        }
    }
    
    requestUnit.onreadystatechange = function () {
        if(requestUnit.readyState == 4 && requestUnit.status == 200) {
            $scope.HousingScope.Units = JSON.parse(requestUnit.responseText);
        }
    }

    requestComplex.open("GET", complexURL, false);
    requestData.open("GET", dataURL, false);
    requestUnit.open("GET", unitURL, false);
    requestComplex.send();
    requestData.send();
    requestUnit.send();
    
    $rootScope.$on("UpdateHousingList", function(event, size, mode){
        $scope.HousingScope.UpdatePageList(size, mode);
    });

    $rootScope.$on("GetSelection", function(event, data){
        $scope.HousingScope.SelectedAssociates = data;
        console.log($scope.HousingScope.SelectedAssociates);
    });

    $scope.HousingScope.UpdatePageList = function (size, mode)
    {
        if(mode == 1)
        {
            $scope.HousingScope.PageSize1 = size;
            $scope.HousingScope.CurrentPage1 = 1;
            setTimeout(function() {
                $scope.HousingScope.LastPage1 = getLastIndex();
            }, 20);
        }
        else if(mode == 2)
        {
            $scope.HousingScope.PageSize2 = size;
            $scope.HousingScope.CurrentPage2 = 1;
            setTimeout(function() {
                $scope.HousingScope.LastPage2 = getLastIndex();
            }, 20);
        }
        else if(mode == 3)
        {
            $scope.HousingScope.PageSize3 = size;
            $scope.HousingScope.CurrentPage3 = 1;
            setTimeout(function() {
                $scope.HousingScope.LastPage3 = getLastIndex();
            }, 20);
        }
    }

    $scope.HousingScope.OnModalOpen = function() {
        $rootScope.$emit("RequestSelection");
    }

    $scope.HousingScope.UpdateContentClass = function (size)
    {
        return size == 1 ? "col-md-12" : "col-md-4";
    }

    $scope.HousingScope.GoToPage = function (version, page, last)
    {
        if(version == 1 && (page >= 1 && page <= $scope.HousingScope.LastPage1))
        {
            $scope.HousingScope.CurrentPage1 = page;
        }
        else if(version == 2 && (page >= 1 && page <= $scope.HousingScope.LastPage2))
        {
            $scope.HousingScope.CurrentPage2 = page;
        }
        else if(version == 3 && (page >= 1 && page <= $scope.HousingScope.LastPage3))
        {
            $scope.HousingScope.CurrentPage3 = page;
        }
    }

    $scope.HousingScope.GetPageClass = function (version, page) {
        if(version == 1)
        {
            return $scope.HousingScope.CurrentPage1 == page ? "btn-revature" : "";
        }
        else if(version == 2)
        {
            return $scope.HousingScope.CurrentPage2 == page ? "btn-revature" : "";
        }
        else if(version == 3)
        {
            return $scope.HousingScope.CurrentPage3 == page ? "btn-revature" : "";
        }
    }

    var inArray = function(array, item)
    {
        for(var i = 0; i < array.length; i++)
        {
            if(array[i] == item)
            {
                return true;
            }
        }
    }

    var getLastIndex = function()
    {
        var pagin = document.getElementById("housing-pagination");
        var pages = pagin.children[0].children[0].children;
        var count = pages.length - 2;

        return count;
    }

    setTimeout(function() {
        $scope.HousingScope.LastPage1 = getLastIndex();
        $scope.HousingScope.LastPage2 = getLastIndex();
        $scope.HousingScope.LastPage3 = getLastIndex();
    }, 20);

    var count = 0;

    $scope.HousingScope.Units.forEach(function(unit) {
        var currentCap = 0;
        var currentCars = 0;
        
        if ($stateParams.Name != undefined)
        {
            var techs = [];
            var batches = [];
            var countTech = 0;
            var countBatch = 0;
            if(unit.Complex.Name == $scope.HousingScope.CurrentComplex)
            {
                $scope.HousingScope.Data.forEach(function(data) {
                    if(data.HousingUnit.AptNumber == unit.AptNumber && data.HousingUnit.Complex.Name == $scope.HousingScope.CurrentComplex)
                    {
                        currentCap++;
                        
                        if(data.Associate.HasCar)
                        {
                            currentCars++;
                        }
                        if(!inArray(techs, data.Associate.Batch.Technology))
                        {
                            techs[countTech] = data.Associate.Batch.Technology;
                        }
                        if(!inArray(batches, data.Associate.Batch.Name))
                        {
                            batches[countBatch] = data.Associate.Batch.Name;
                        }
                    }
                }, this);

                unit['Capacity'] = currentCap;
                unit['Cars'] = currentCars;
                unit['Tech'] = techs;
                unit['Batch'] = batches;

                $scope.HousingScope.CurrentUnits[count] = unit;
                count++;
            }
        }
        else
        {
            $scope.HousingScope.Data.forEach(function(data) {
                if(data.HousingUnit.AptNumber == unit.AptNumber && data.HousingUnit.Complex.Name == unit.Complex.Name)
                {
                    currentCap++;
                    
                    if(data.Associate.HasCar)
                    {
                        currentCars++;
                    }
                }
            }, this);

            unit['Capacity'] = currentCap;
            unit['Cars'] = currentCars;
        }
    }, this);

    $scope.HousingScope.ToggleFilters = function() {
        var filters = document.getElementById("housing-filters");
        var list = document.getElementById("housing-list");

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

    $scope.HousingScope.GetCurrentComplex = function (complex) {
        $scope.HousingScope.CurrentHousing = complex;
    }

    $scope.HousingScope.GetCurrentUnit = function (unit) {
        $scope.HousingScope.CurrentUnit = unit;
    }

    $scope.HousingScope.StartAssigning = function (unit) {
        $scope.HousingScope.HousingFilters.Current = unit.AptNumber + " " + unit.Complex.Name;
        var dashboard = document.getElementById("dashboard-housing");
        var assignBtn = document.getElementById("assignAssociates");
        var filterBtn;
        var filterBtns = document.getElementsByClassName("btn-filter");
        var assigningCtrls = document.getElementsByClassName("assigning-controls");

        for(var i = 0; i < filterBtns.length; i++)
        {
            if(filterBtns[i].parentElement.parentElement == dashboard)
            {
                filterBtn = filterBtns[i];
            }
        }

        $rootScope.$emit("ExpandView");

        filterBtn.style.display = "none";
        assignBtn.style.display = "none";
        assigningCtrls[0].style.display = "inline-block";
        assigningCtrls[1].style.display = "inline-block";
    }

    $scope.HousingScope.StopAssigning = function () {
        $scope.HousingScope.HousingFilters.Current = "";
        var dashboard = document.getElementById("dashboard-housing");
        var assignBtn = document.getElementById("assignAssociates");
        var filterBtn;
        var filterBtns = document.getElementsByClassName("btn-filter");
        var assigningCtrls = document.getElementsByClassName("assigning-controls");

        for(var i = 0; i < filterBtns.length; i++)
        {
            if(filterBtns[i].parentElement.parentElement == dashboard)
            {
                filterBtn = filterBtns[i];
            }
        }
        
        $rootScope.$emit("ExpandView");
        $rootScope.$emit("ResetSelection");

        filterBtn.style.display = "inline-block";
        assignBtn.style.display = "inline-block";
        assigningCtrls[0].style.display = "none";
        assigningCtrls[1].style.display = "none";
    }

    var updateSpacing = function (time, height) {
        setTimeout(function() {
            var content = document.getElementById("housing-content");
            var contentParent = content.parentElement;
            var spacing = contentParent.clientHeight;

            for (var i = 0; i < contentParent.children.length; i++)
            {
                if (contentParent.children[i] != content)
                {
                    if (contentParent.children[i].id != "housing-filters")
                    {
                        spacing -= contentParent.children[i].clientHeight;
                    }
                    else if (contentParent.children[i].id == "housing-filters" && height != 0) 
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