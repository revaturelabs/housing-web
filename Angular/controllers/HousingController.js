angular.module("HousingApp")
.controller("HousingCtrl", function($scope, $http, $stateParams, associate, batch, housingcomplex, housingdata, housingunit) {

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
    $scope.HousingScope.Associates = [];
    $scope.HousingScope.Batches = [];
    $scope.HousingScope.Complexes = [];
    $scope.HousingScope.Data = [];
    $scope.HousingScope.Units = [];
    $scope.HousingScope.NewComplex = {
        Name: "",
        Street: "",
        City: "",
        State: "",
        ZipCode: "",
        PhoneNumber: ""
    };
    $scope.HousingScope.UpdateComplex = {
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
    };
    $scope.HousingScope.UpdateUnit = {
        HousingUnitName: "",
        AptNumber: "",
        MaxCapacity: null,
        GenderName: "",
        HousingComplexName: "",
        LeaseEndDate: ""
    };
    $scope.HousingScope.Search = {
        Housing: "",
        Unit: ""
    };

    $scope.HousingScope.UpdateAjax = function() {
        associate.getAll(function(data){
            $scope.HousingScope.Associates = data;
            $scope.HousingScope.UpdateUnits();
            setTimeout(function() {
                $scope.HousingScope.LastPage2 = getLastIndex();
                if($scope.HousingScope.LastPage2 < $scope.HousingScope.CurrentPage2 && $scope.HousingScope.CurrentPage2 > 1)
                {
                    $scope.HousingScope.CurrentPage2 = $scope.HousingScope.LastPage2;
                }
            }, 200);
        });

        batch.getAll(function(data){
            $scope.HousingScope.Batches = data;
            $scope.HousingScope.UpdateUnits();
            setTimeout(function() {
                $scope.HousingScope.LastPage2 = getLastIndex();
                if($scope.HousingScope.LastPage2 < $scope.HousingScope.CurrentPage2 && $scope.HousingScope.CurrentPage2 > 1)
                {
                    $scope.HousingScope.CurrentPage2 = $scope.HousingScope.LastPage2;
                }
            }, 200);
        });

        housingcomplex.getAll(function(data){
            $scope.HousingScope.Complexes = data;
            setTimeout(function() {
                $scope.HousingScope.LastPage1 = getLastIndex();
                if($scope.HousingScope.LastPage1 < $scope.HousingScope.CurrentPage1 && $scope.HousingScope.CurrentPage1 > 1)
                {
                    $scope.HousingScope.CurrentPage1 = $scope.HousingScope.LastPage1;
                }
            }, 200);
        });

        housingdata.getAll(function(data){
            $scope.HousingScope.Data = data;
            $scope.HousingScope.UpdateUnits();
            setTimeout(function() {
                $scope.HousingScope.LastPage2 = getLastIndex();
                if($scope.HousingScope.LastPage2 < $scope.HousingScope.CurrentPage2 && $scope.HousingScope.CurrentPage2 > 1)
                {
                    $scope.HousingScope.CurrentPage2 = $scope.HousingScope.LastPage2;
                }
            }, 200);
        });

        housingunit.getAll(function(data){
            $scope.HousingScope.Units = data;
            $scope.HousingScope.UpdateUnits();
            setTimeout(function() {
                $scope.HousingScope.LastPage2 = getLastIndex();
                if($scope.HousingScope.LastPage2 < $scope.HousingScope.CurrentPage2 && $scope.HousingScope.CurrentPage2 > 1)
                {
                    $scope.HousingScope.CurrentPage2 = $scope.HousingScope.LastPage2;
                }
            }, 200);
        });
    }
    
    $scope.HousingScope.UpdateAjax();

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
        if($scope.HousingScope.Units.length > 0 && $scope.HousingScope.Data.length > 0 && $scope.HousingScope.Associates.length > 0 && $scope.HousingScope.Batches.length > 0)
        {
            $scope.HousingScope.Units.forEach(function(unit) {
                var currentCap = 0;
                var currentCars = 0;
                var techs = [];
                var batches = [];
                var emails = [];
                var occupants = [];

                if(unit.HousingComplexName == $scope.HousingScope.CurrentComplex)
                {
                    $scope.HousingScope.Data.forEach(function(data) {
                        if(data.HousingUnitName == unit.HousingUnitName)
                        {
                            emails.push(data.AssociateEmail);
                        }
                    }, this);

                    emails.forEach(function(email) {
                        $scope.HousingScope.Associates.forEach(function(occupant) {
                            if(email == occupant.Email)
                            {
                                currentCap++;
                            
                                if(occupant.HasCar)
                                {
                                    currentCars++;
                                }

                                if(!inArray(batches, occupant.BatchName))
                                {
                                    batches.push(occupant.BatchName);
                                }

                                occupants.push(occupant);
                            }
                        }, this);
                    }, this);

                    batches.forEach(function(name) {
                        $scope.HousingScope.Batches.forEach(function(batch) {
                            if(batch.Name == name)
                            {
                                if(!inArray(techs, batch.Technology))
                                {
                                    techs.push(batch.Technology);
                                }
                            }
                        }, this);
                    }, this);

                    unit['Capacity'] = currentCap;
                    unit['Cars'] = currentCars;
                    unit['Tech'] = techs;
                    unit['Batch'] = batches;
                    unit['Occupants'] = occupants;

                    if($scope.HousingScope.CurrentUnits.length > 0)
                    {
                        var check = 0;
                        $scope.HousingScope.CurrentUnits.forEach(function(curunit) {
                            if(curunit.HousingUnitName == unit.HousingUnitName) {
                                check++;
                            }
                        }, this);

                        if(check == 0) {
                            $scope.HousingScope.CurrentUnits.push(unit);
                        }
                    }
                    else{
                        $scope.HousingScope.CurrentUnits.push(unit);
                    }
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

    $scope.HousingScope.EditComplex = function (complex) {
        var addressObj = splitAddress(complex.Address);
        $scope.HousingScope.UpdateComplex = {
            Name: complex.Name,
            Street: addressObj.street,
            City: addressObj.city,
            State: addressObj.state,
            ZipCode: parseInt(addressObj.zip),
            PhoneNumber: complex.PhoneNumber
        };
    }

    $scope.HousingScope.EditUnit = function (unit) {
        $scope.HousingScope.UpdateUnit = {
            HousingUnitName: unit.HousingUnitName,
            AptNumber: unit.AptNumber,
            MaxCapacity: unit.MaxCapacity,
            GenderName: unit.GenderName,
            HousingComplexName: unit.HousingComplexName,
            LeaseEndDate: reverseDateFormat(unit.LeaseEndDate)
        };
    }

    $scope.HousingScope.AddComplex = function () {
        var temp = $scope.HousingScope.NewComplex;
        var complex = {
            Name: temp.Name,
            Address: temp.Street + ", " + temp.City + ", " + temp.State + " " + temp.ZipCode,
            PhoneNumber: temp.PhoneNumber
        };
        housingcomplex.add(complex, function(data){
            if(data.status == 200)
            {
                $scope.HousingScope.UpdateAjax();
            }
        });
    }

    $scope.HousingScope.ModComplex = function () {
        var temp = $scope.HousingScope.UpdateComplex;
        var complex = {
            Name: temp.Name,
            Address: temp.Street + ", " + temp.City + ", " + temp.State + " " + temp.ZipCode,
            PhoneNumber: temp.PhoneNumber
        };
        housingcomplex.update(complex.Name, complex, function(data){
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

    $scope.HousingScope.ModUnit = function () {
        var temp = $scope.HousingScope.UpdateUnit;
        var unit = {
            HousingUnitName: $scope.HousingScope.CurrentComplex + " " + temp.AptNumber,
            AptNumber: temp.AptNumber,
            MaxCapacity: temp.MaxCapacity,
            GenderName: temp.GenderName,
            HousingComplexName: $scope.HousingScope.CurrentComplex,
            LeaseEndDate: getDateFormat(temp.LeaseEndDate)
        };
        housingunit.update(unit.HousingUnitName, unit, function(data){
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

    var splitAddress = function(address)
    {
        var result1 = address.split(", ");
        var result2 = result1[2].split(" ");

        var addressObj = {
            street: result1[0],
            city: result1[1],
            state: result2[0],
            zip: result2[1]
        };

        return addressObj;
    }

    var getDateFormat = function(d)
    {
        var dd = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
        var mm = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
        var yyyy = d.getFullYear();

        return yyyy + "-" + mm + "-" + dd + "T00:00:00";
    }

    var reverseDateFormat = function(d)
    {
        var date = new Date(1, 1, 1, 0, 0, 0, 0);
        date.setDate(d.slice(8,10));
        date.setMonth(d.slice(5,7)-1);
        date.setFullYear(d.slice(0,4));
        
        return date;
    }

    var getLastIndex = function()
    {
        var pagin = document.getElementById("housing-pagination");
        if(pagin == null)
        {
            console.log(pagin);
        }
        var pages = pagin.children[0].children[0].children;
        var pageCount = pages.length - 2;

        return pageCount;
    }
});