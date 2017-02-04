angular.module("HousingApp")
.constant("complexURL", "fakedata/HousingComplexes.json")
.constant("dataURL", "fakedata/HousingData.json")
.constant("unitURL", "fakedata/HousingUnits.json")
.controller("HousingCtrl", function($scope, $http, $stateParams, complexURL, dataURL, unitURL) {
    var request1 = new XMLHttpRequest();
    var request2 = new XMLHttpRequest();
    var request3 = new XMLHttpRequest();
    $scope.CurrentComplex = $stateParams.Name;
    $scope.CurrentUnits = [];
    $scope.units = [];
    $scope.data = [];
    $scope.complexes = [];
    $scope.HousingFilters = {
        srcChoice: "name",
        srcString: "",
        radTech: "all",
        radGender: "all",
        radCar: "all"
    };

    request1.onreadystatechange = function () {
        if(request1.readyState == 4 && request1.status == 200) {
            $scope.units = JSON.parse(request1.responseText);
        }
    }

    request2.onreadystatechange = function () {
        if(request2.readyState == 4 && request2.status == 200) {
            $scope.data = JSON.parse(request2.responseText);
        }
    }
    
    request3.onreadystatechange = function () {
        if(request3.readyState == 4 && request3.status == 200) {
            $scope.complexes = JSON.parse(request3.responseText);
        }
    }

    request1.open("GET", unitURL, false);
    request2.open("GET", dataURL, false);
    request3.open("GET", complexURL, false);
    request1.send();
    request2.send();
    request3.send();

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

    $scope.units.forEach(function(unit) {
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
                $scope.data.forEach(function(data) {
                    if(data.HousingUnit.AptNumber == unit.AptNumber && data.HousingUnit.Complex.Name == $scope.CurrentComplex)
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

                $scope.CurrentUnits[count] = unit;
                count++;
            }
        }
        else
        {
            $scope.data.forEach(function(data) {
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

    $scope.toggleFilters = function() {
        var filters = document.getElementById("housing-filters");
        var list = document.getElementById("housing-list");

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