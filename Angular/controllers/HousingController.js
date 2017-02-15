angular.module("HousingApp")
.controller("HousingCtrl", function($scope, $http, $stateParams, complexURL, dataURL, unitURL) {
    var requestComplex = new XMLHttpRequest();
    var requestData = new XMLHttpRequest();
    var requestUnit = new XMLHttpRequest();

    $scope.HousingScope = [];
    $scope.HousingScope.PageSize1 = 3;
    $scope.HousingScope.PageSize2 = 3;
    $scope.HousingScope.CurrentPage1 = 1;
    $scope.HousingScope.CurrentPage2 = 1;
    $scope.HousingScope.LastPage1 = 1;
    $scope.HousingScope.LastPage2 = 1;
    $scope.HousingScope.CurrentHousing = {};
    $scope.HousingScope.CurrentUnit = {};
    $scope.HousingScope.CurrentComplex = $stateParams.Name;
    $scope.HousingScope.CurrentUnits = [];
    $scope.HousingScope.Units = [];
    $scope.HousingScope.Data = [];
    $scope.HousingScope.Complexes = [];

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
    }, 20);

    var count = 0;

    $scope.HousingScope.Units.forEach(function(unit) {
        var currentCap = 0;
        var currentCars = 0;
        var techs = [];
        var batches = [];
        var occupants = [];
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
                    occupants.push(data.Associate);
                }
            }, this);

            unit['Capacity'] = currentCap;
            unit['Cars'] = currentCars;
            unit['Tech'] = techs;
            unit['Batch'] = batches;
            unit['Occupants'] = occupants;

            $scope.HousingScope.CurrentUnits[count] = unit;
            count++;
        }
    }, this);

    $scope.HousingScope.GetCurrentComplex = function (complex) {
        $scope.HousingScope.CurrentHousing = complex;
    }

    $scope.HousingScope.GetCurrentUnit = function (unit) {
        $scope.HousingScope.CurrentUnit = unit;
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