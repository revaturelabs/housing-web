angular.module("HousingApp")
.controller("HousingCtrl", function($scope, $http, $stateParams, housingcomplex, housingdata, housingunit) {

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
    $scope.HousingScope.NewComplex = {
        Name: "",
        Street: "",
        City: "",
        State: "",
        ZipCode: "",
        PhoneNumber: ""
    };
    $scope.HousingScope.NewUnit = {
        HousingUnitName: "",
        AptNumber: "",
        MaxCapacity: null,
        GenderName: "",
        HousingComplexName: "",
        LeaseEndDate: ""
    }
    $scope.HousingScope.Search = {
        Housing: "",
        Unit: ""
    };

    var count = 0;

    $scope.HousingScope.UpdateAjax = function() {
        housingcomplex.getAll(function(data){
            $scope.HousingScope.Complexes = data;
            setTimeout(function() {
                $scope.HousingScope.LastPage1 = getLastIndex();
                if($scope.HousingScope.LastPage1 < $scope.HousingScope.CurrentPage1)
                {
                    $scope.HousingScope.CurrentPage1 = $scope.HousingScope.LastPage1;
                }
            }, 20);
        });

        housingdata.getAll(function(data){
            $scope.HousingScope.Data = data;
            $scope.HousingScope.UpdateUnits();
            setTimeout(function() {
                $scope.HousingScope.LastPage2 = getLastIndex();
                if($scope.HousingScope.LastPage2 < $scope.HousingScope.CurrentPage2)
                {
                    $scope.HousingScope.CurrentPage2 = $scope.HousingScope.LastPage2;
                }
            }, 20);
        });

        housingunit.getAll(function(data){
            $scope.HousingScope.Units = data;
            $scope.HousingScope.UpdateUnits();
            setTimeout(function() {
                $scope.HousingScope.LastPage2 = getLastIndex();
                if($scope.HousingScope.LastPage2 < $scope.HousingScope.CurrentPage2)
                {
                    $scope.HousingScope.CurrentPage2 = $scope.HousingScope.LastPage2;
                }
            }, 20);
        });
    }
    
    $scope.HousingScope.UpdateAjax();

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

    $scope.HousingScope.GoToPage = function (version, page)
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

    $scope.HousingScope.UpdateUnits = function()
    {
        if($scope.HousingScope.Units.length > 0 && $scope.HousingScope.Data.length > 0)
        {
            $scope.HousingScope.Units.forEach(function(unit) {
                var currentCap = 0;
                var currentCars = 0;
                var techs = [];
                var batches = [];
                var occupants = [];
                var countTech = 0;
                var countBatch = 0;
                if(unit.HousingComplexName == $scope.HousingScope.CurrentComplex)
                {
                    $scope.HousingScope.Data.forEach(function(data) {
                        if(data.HousingUnitName == unit.HousingUnitName)
                        {
                            currentCap++;
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
        }
    }

    $scope.HousingScope.GetCurrentComplex = function (complex) {
        $scope.HousingScope.CurrentHousing = complex;
    }

    $scope.HousingScope.GetCurrentUnit = function (unit) {
        $scope.HousingScope.CurrentUnit = unit;
    }

    $scope.HousingScope.AddComplex = function () {
        var temp = $scope.HousingScope.NewComplex;
        var unit = {
            Name: temp.Name,
            Address: temp.Street + ", " + temp.City + ", " + temp.State + " " + temp.ZipCode,
            PhoneNumber: temp.PhoneNumber
        };
        housingcomplex.add(unit, function(data){
            if(data.status == 200)
            {
                $scope.HousingScope.UpdateAjax();
            }
        });
    }

    $scope.HousingScope.AddUnit = function () {
        var temp = $scope.HousingScope.NewUnit;
        var unit = {
            HousingUnitName: $scope.HousingScope.CurrentComplex + " " + temp.AptNumber,
            AptNumber: temp.AptNumber,
            MaxCapacity: temp.MaxCapacity,
            GenderName: temp.GenderName,
            HousingComplexName: $scope.HousingScope.CurrentComplex,
            LeaseEndDate: getDateFormat(temp.LeaseEndDate)
        };
        housingunit.add(unit, function(data){
            if(data.status == 200)
            {
                $scope.HousingScope.UpdateAjax();
            }
        });
    }

    $scope.HousingScope.RemoveComplex = function (complex) {
        housingcomplex.delete(complex, function(data){
            if(data.status == 200)
            {
                $scope.HousingScope.UpdateAjax();
            }
        });
    }

    $scope.HousingScope.RemoveUnit = function (unit) {
        housingunit.delete(unit, function(data){
            if(data.status == 200)
            {
                $scope.HousingScope.UpdateAjax();
            }
        });
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

    var getDateFormat = function(d)
    {
        var dd = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
        var mm = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
        var yyyy = d.getFullYear();

        return yyyy + "-" + mm + "-" + dd + "T00:00:00";
    }

    var getLastIndex = function()
    {
        var pagin = document.getElementById("housing-pagination");
        var pages = pagin.children[0].children[0].children;
        var pageCount = pages.length - 2;

        return pageCount;
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