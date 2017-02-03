angular.module("HousingApp")
.constant("complexURL", "fakedata/HousingComplexes.json")
.constant("dataURL", "fakedata/HousingData.json")
.constant("unitURL", "fakedata/HousingUnits.json")
.filter('address', function() {
    return function(x) {
        for (var i = 0; i < x.length; i++) {
            if (x[i] === ',') {
                var start = x.slice(0, i);
                var end = x.slice(i+2);
                x = start + '\n' + end;
                i = x.length;
            }
        }
        return x;
    }
})
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
})
.filter('hfilters', function(){
    return function(units, HousingFilters, data) {
        if(!HousingFilters || !data)
        {
            return units;
        }

        var result = [];
        var count = 0;

        units.forEach(function(unit) {
            var checks = 0;
            var techs = [];
            var batches = [];
            var countTech = 0;
            var countBatch = 0;

            var inArray = function(array, item, mode)
            {
                if(mode == 1)
                {
                    for(var i = 0; i < array.length; i++)
                    {
                        if(array[i] == item)
                        {
                            return true;
                        }
                    }
                }
                else if(mode == 2)
                {
                    for(var i = 0; i < array.length; i++)
                    {
                        if(array[i].toLowerCase().includes(item.toLowerCase()))
                        {
                            return true;
                        }
                    }
                }
                
                return false;
            }

            data.forEach(function(item) {
                if (item.HousingUnit.AptNumber == unit.AptNumber && item.HousingUnit.Complex.Name == unit.Complex.Name)
                {
                    if (!inArray(techs, item.Associate.Batch.Technology, 1))
                    {
                        techs[countTech] = item.Associate.Batch.Technology;
                        countTech++;
                    }

                    if (!inArray(techs, item.Associate.Batch.Name, 1))
                    {
                        batches[countBatch] = item.Associate.Batch.Name;
                        countBatch++;
                    }
                }
            }, this);
            
            if (HousingFilters.srcChoice == "name" && (HousingFilters.srcString == "" || (unit.AptNumber + " " + unit.Complex.Name.toLowerCase()).includes(HousingFilters.srcString.toLowerCase())))
            {
                checks++;
            }
            else if (HousingFilters.srcChoice == "batch" && (HousingFilters.srcString == "" || inArray(batches, HousingFilters.srcString, 2)))
            {
                checks++;
            }

            if ((HousingFilters.radTech == "all") || (inArray(techs, HousingFilters.radTech, 2)))
            {
                checks++;
            }

            if ((HousingFilters.radGender == "all") || (HousingFilters.radGender == unit.Gender.toLowerCase()))
            {
                checks++;
            }
            
            if ((HousingFilters.radCar == "all") || (HousingFilters.radCar == "yes" && unit.Cars < 2) || (HousingFilters.radCar == "no" && unit.Cars >= 2))
            {
                checks++;
            }

            if (checks == 4)
            {
                result[count] = unit;
                count++;
            }
        }, this);

        return result;
    }
})
.filter('array', function(){
    return function(array) {
        var str = "";

        if (array.length > 0)
        {
            for (var i = 0; i < array.length; i++)
            {
                if(i != array.length - 1)
                {
                    str += array[i] + ", ";
                }
                else
                {
                    str += array[i];
                }
            }
        }
        else
        {
            str = "None";
        }

        return str;
    }
});
