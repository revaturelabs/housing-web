angular.module("HousingApp")
.controller("HousingCtrl", function($scope, $http, $stateParams, complexURL, dataURL, unitURL) {
    var requestComplex = new XMLHttpRequest();
    var requestData = new XMLHttpRequest();
    var requestUnit = new XMLHttpRequest();

    $scope.HousingScope = [];
    $scope.HousingScope.PageSize1 = 3;
    $scope.HousingScope.PageSize2 = 3;
    $scope.HousingScope.PageSize3 = 3;
    $scope.HousingScope.CurrentPage1 = 1;
    $scope.HousingScope.CurrentPage2 = 1;
    $scope.HousingScope.CurrentPage3 = 1;
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
        RadCar: "all"
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

    $scope.HousingScope.GoToPage = function (version, page) {
        if(version == $scope.HousingScope.CurrentPage1)
        {
            $scope.HousingScope.CurrentPage1 = page;
        }
        else if(version == $scope.HousingScope.CurrentPage2)
        {
            $scope.HousingScope.CurrentPage2 = page;
        }
        else
        {
            $scope.HousingScope.CurrentPage3 = page;
        }
    }

    $scope.HousingScope.GetPageClass = function (version, page) {
        if(version == $scope.HousingScope.CurrentPage1)
        {
            return $scope.HousingScope.CurrentPage1 == page ? "btn-revature" : "";
        }
        else if(version == $scope.HousingScope.CurrentPage2)
        {
            return $scope.HousingScope.CurrentPage2 == page ? "btn-revature" : "";
        }
        else
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
            if(unit.Complex.Name == $scope.CurrentComplex)
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