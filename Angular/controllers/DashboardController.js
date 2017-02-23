angular.module("HousingApp")
.controller("DashboardCtrl", function($scope, $http, $state, $stateParams, associate, batch, housingcomplex, housingdata, housingunit) {

    $scope.DashboardScope = [];
    $scope.DashboardScope.AssociatePageSize = 9;
    $scope.DashboardScope.HousingPageSize = 3;
    $scope.DashboardScope.AssociateCurrentPage = 1;
    $scope.DashboardScope.HousingCurrentPage = 1;
    $scope.DashboardScope.AssociateLastPage = 1;
    $scope.DashboardScope.HousingLastPage = 1;
    $scope.DashboardScope.DisplayMode = 1;
    $scope.DashboardScope.FilterMode = 1;
    $scope.DashboardScope.CurrentAssociate = {};
    $scope.DashboardScope.CurrentHousing = {};
    $scope.DashboardScope.CurrentUnit = {};
    $scope.DashboardScope.Associates = [];
    $scope.DashboardScope.Batches = [];
    $scope.DashboardScope.Complexes = [];
    $scope.DashboardScope.Data = [];
    $scope.DashboardScope.Units = [];
    $scope.DashboardScope.SelectedAssociates = [];
    $scope.DashboardScope.Filters = {
        ASrcChoice: "name",
        ASrcString: "",
        HSrcChoice: "name",
        HSrcString: "",
        RadTech: "all",
        RadGender: "all",
        RadCar: "all",
        Current: ""
    };

    var AllAssociates = [];
    var UnassignedAssociates = [];

    $scope.DashboardScope.UpdateAjax = function() {
        associate.getAll(function(data){
            AllAssociates = data;
            $scope.DashboardScope.UpdateUnits();
            $scope.DashboardScope.UpdateAssociates();
        });

        associate.getUnassigned(function(data){
            UnassignedAssociates = data;
            $scope.DashboardScope.Associates = UnassignedAssociates;
            $scope.DashboardScope.UpdateUnits();
            $scope.DashboardScope.UpdateAssociates();
        });

        batch.getAll(function(data){
            $scope.DashboardScope.Batches = data;
            $scope.DashboardScope.UpdateUnits();
            $scope.DashboardScope.UpdateAssociates();
        });

        housingcomplex.getAll(function(data){
            $scope.DashboardScope.Complexes = data;
            $scope.DashboardScope.UpdateUnits();
        });

        housingdata.getAll(function(data){
            $scope.DashboardScope.Data = data;
            $scope.DashboardScope.UpdateUnits();
        });

        housingunit.getAll(function(data){
            $scope.DashboardScope.Units = data;
            $scope.DashboardScope.UpdateUnits();
            setTimeout(function() {
                $scope.DashboardScope.HousingLastPage = getLastIndex("housing-pagination");
                if($scope.DashboardScope.HousingLastPage < $scope.DashboardScope.HousingCurrentPage)
                {
                    $scope.DashboardScope.HousingCurrentPage = $scope.DashboardScope.HousingLastPage;
                }
            }, 200);
        });
    }

    $scope.DashboardScope.UpdateAjax();

    $scope.DashboardScope.UpdatePageList = function (size, mode)
    {
        if(mode == 1)
        {
            $scope.DashboardScope.AssociatePageSize = size;
            $scope.DashboardScope.AssociateCurrentPage = 1;
            setTimeout(function() {
                $scope.DashboardScope.AssociateLastPage = getLastIndex("associate-pagination");
            }, 20);
        }
        else if(mode == 2)
        {
            $scope.DashboardScope.HousingPageSize = size;
            $scope.DashboardScope.HousingCurrentPage = 1;
            setTimeout(function() {
                $scope.DashboardScope.HousingLastPage = getLastIndex("housing-pagination");
            }, 20);
        }
    }

    $scope.DashboardScope.ResetSelection = function ()
    {
        var list = document.getElementById("associate-list");
        var children = list.children;

        for(var i = 0; i < children.length; i++)
        {
            if(children[i].firstElementChild.firstElementChild.classList.contains("selected"))
            {
                children[i].firstElementChild.firstElementChild.classList.remove("selected");
            }
        }

        $scope.DashboardScope.SelectedAssociates = [];
    }

    $scope.DashboardScope.UpdateContentClass = function (mode, size)
    {
        if(mode == 1)
        {
            return size == 9 ? "col-md-12" : "col-md-4";
        }
        else if(mode == 2)
        {
            return size == 1 ? "col-md-12" : "col-md-4";
        }
    }

    $scope.DashboardScope.GoToPage = function (version, page) {
        if(version == 1 && (page >= 1 && page <= $scope.DashboardScope.AssociateLastPage))
        {
            $scope.DashboardScope.AssociateCurrentPage = page;
        }
        else if(version == 2 && (page >= 1 && page <= $scope.DashboardScope.HousingLastPage))
        {
            $scope.DashboardScope.HousingCurrentPage = page;
        }
    }

    $scope.DashboardScope.GetPageClass = function (version, page) {
        if(version == 1)
        {
            return $scope.DashboardScope.AssociateCurrentPage == page ? "btn-revature" : "";
        }
        else if(version == 2)
        {
            return $scope.DashboardScope.HousingCurrentPage == page ? "btn-revature" : "";
        }
    }

    $scope.DashboardScope.ToggleDetails = function (event) {
        var panel = event.currentTarget.parentElement.parentElement.parentElement.parentElement;

        if(panel.children[1].style.display == "none")
        {
            panel.children[1].style.display = "block";
            event.currentTarget.children[0].classList.remove("glyphicon-menu-down");
            event.currentTarget.children[0].classList.add("glyphicon-menu-up");
        }
        else if(panel.children[1].style.display == "block")
        {
            panel.children[1].style.display = "none";
            event.currentTarget.children[0].classList.remove("glyphicon-menu-up");
            event.currentTarget.children[0].classList.add("glyphicon-menu-down");
        }
    }

    $scope.DashboardScope.ToggleFilters = function(id) {
        var filters = document.getElementById(id + "-filters");
        var list = document.getElementById(id + "-list");

        if(filters != undefined && list != undefined)
        {
            if(filters.style.height == "15em")
            {
                filters.style.height = "0em";
            }
            else if(filters.style.height == "0em")
            {
                filters.style.height = "15em";
            }
        }
    }

    $scope.DashboardScope.SelectPerson = function(event, person)
    {
        var list = document.getElementById("associate-list");
        var target = event.currentTarget.parentElement.parentElement;
        var children = list.children;
        
        if(children[0].classList.contains("col-md-4"))
        {
            if(target.classList.contains("selected"))
            {
                target.classList.remove("selected");
            }
            else
            {
                target.classList.add("selected");
            }
            $scope.DashboardScope.SelectedAssociates.push(person);
        }
    }

    $scope.DashboardScope.GetCurrentUnit = function (unit) {
        $scope.DashboardScope.CurrentUnit = unit;
    }

    $scope.DashboardScope.StartAssigning = function (unit) {
        $scope.DashboardScope.CurrentUnit = unit;
        $scope.DashboardScope.Filters.Current = unit.HousingUnitName;
        var housingFilterBtn;
        var associateFilterBtn;
        var housingdash = document.getElementById("dashboard-housing");
        var assignBtns = document.getElementsByClassName("assignAssociates");
        var removeBtns = document.getElementsByClassName("removeAssociates");
        var occupants = document.getElementsByClassName("housing-occupants");
        var filterBtns = document.getElementsByClassName("btn-filter");
        var assigningCtrls = document.getElementsByClassName("assigning-controls");

        $scope.DashboardScope.Filters.RadGender = unit.GenderName;
        $scope.DashboardScope.FilterMode = 2;
        $scope.DashboardScope.ExpandView();

        if(document.getElementById("housing-filters").style.height == "15em") {
            $scope.DashboardScope.ToggleFilters("housing");
        }

        document.getElementById("aGenderAll").disabled = true;
        document.getElementById("aGenderMale").disabled = true;
        document.getElementById("aGenderFemale").disabled = true;

        for(var i = 0; i < filterBtns.length; i++) {
            if(filterBtns[i].parentElement.parentElement == housingdash) {
                housingFilterBtn = filterBtns[i];
            } else {
                associateFilterBtn = filterBtns[i];
            }
        }

        for(var i = 0; i < assignBtns.length; i++) {
            assignBtns[i].style.display = "none";
            removeBtns[i].style.display = "none";
        }

        for(var i = 0; i < occupants.length; i++) {
            occupants[i].classList.add("current");
        }

        housingFilterBtn.style.display = "none";
        associateFilterBtn.style.display = "inline-block";
        assigningCtrls[0].style.display = "inline-block";
        assigningCtrls[1].style.display = "inline-block";
    }

    $scope.DashboardScope.StopAssigning = function (modal) {
        assignAssociate($scope.DashboardScope.CurrentUnit, modal);
        $scope.DashboardScope.CurrentUnit = {};
        $scope.DashboardScope.Filters.Current = "";
        var housingFilterBtn;
        var associateFilterBtn;
        var housingdash = document.getElementById("dashboard-housing");
        var assignBtns = document.getElementsByClassName("assignAssociates");
        var removeBtns = document.getElementsByClassName("removeAssociates");
        var occupants = document.getElementsByClassName("housing-occupants");
        var filterBtns = document.getElementsByClassName("btn-filter");
        var assigningCtrls = document.getElementsByClassName("assigning-controls");
        $scope.DashboardScope.Filters.RadGender = "all";
        
        $scope.DashboardScope.FilterMode = 1;
        $scope.DashboardScope.ExpandView();

        if(document.getElementById("associate-filters").style.height == "15em") {
            $scope.DashboardScope.ToggleFilters("associate");
        }

        document.getElementById("aGenderAll").disabled = false;
        document.getElementById("aGenderMale").disabled = false;
        document.getElementById("aGenderFemale").disabled = false;

        for(var i = 0; i < filterBtns.length; i++) {
            if(filterBtns[i].parentElement.parentElement == housingdash) {
                housingFilterBtn = filterBtns[i];
            } else {
                associateFilterBtn = filterBtns[i];
            }
        }

        for(var i = 0; i < assignBtns.length; i++) {
            assignBtns[i].style.display = "inline-block";
            removeBtns[i].style.display = "inline-block";
        }

        for(var i = 0; i < occupants.length; i++) {
            occupants[i].classList.remove("current");
        }

        housingFilterBtn.style.display = "inline-block";
        associateFilterBtn.style.display = "none";
        assigningCtrls[0].style.display = "none";
        assigningCtrls[1].style.display = "none";
    }

    $scope.DashboardScope.StartRemoving = function (unit) {
        $scope.DashboardScope.CurrentUnit = unit;
        $scope.DashboardScope.Filters.Current = unit.HousingUnitName;
        $scope.DashboardScope.Associates = unit.Occupants;
        setTimeout(function() {
            $scope.DashboardScope.AssociateLastPage = getLastIndex("associate-pagination");
            if($scope.DashboardScope.AssociateLastPage < $scope.DashboardScope.AssociateCurrentPage) {
                $scope.DashboardScope.AssociateCurrentPage = $scope.DashboardScope.AssociateLastPage;
            }
        }, 20);

        var housingFilterBtn;
        var associateFilterBtn;
        var housingdash = document.getElementById("dashboard-housing");
        var title = document.getElementById("dashboard-associate").children[0].children[0];
        var assigned = document.getElementsByClassName("assigned");
        var unassigned = document.getElementsByClassName("unassigned");
        var assignBtns = document.getElementsByClassName("assignAssociates");
        var removeBtns = document.getElementsByClassName("removeAssociates");
        var filterBtns = document.getElementsByClassName("btn-filter");
        var removingCtrls = document.getElementsByClassName("removing-controls");
        $scope.DashboardScope.Filters.RadGender = unit.GenderName;

        $scope.DashboardScope.ExpandView();
        $scope.DashboardScope.DisplayMode = 2;

        if(document.getElementById("housing-filters").style.height == "15em") {
            $scope.DashboardScope.ToggleFilters("housing");
        }

        document.getElementById("aGenderAll").disabled = true;
        document.getElementById("aGenderMale").disabled = true;
        document.getElementById("aGenderFemale").disabled = true;

        for(var i = 0; i < filterBtns.length; i++) {
            if(filterBtns[i].parentElement.parentElement == housingdash) {
                housingFilterBtn = filterBtns[i];
            } else {
                associateFilterBtn = filterBtns[i];
            }
        }

        for(var i = 0; i < removeBtns.length; i++) {
            assignBtns[i].style.display = "none";
            removeBtns[i].style.display = "none";
        }

        setTimeout(function() {
            for(var i = 0; i < assigned.length; i++) {
                assigned[i].style.display = "inline-block";
            }
        }, 2);

        for(var i = 0; i < unassigned.length; i++) {
            unassigned[i].style.display = "none";
        }
        
        housingFilterBtn.style.display = "none";
        associateFilterBtn.style.display = "inline-block";
        removingCtrls[0].style.display = "inline-block";
        removingCtrls[1].style.display = "inline-block";
        title.innerHTML = "Assigned Associates";
    }

    $scope.DashboardScope.StopRemoving = function (modal) {
        removeAssociate($scope.DashboardScope.CurrentUnit, modal);
        $scope.DashboardScope.CurrentUnit = {};
        $scope.DashboardScope.Filters.Current = "";
        $scope.DashboardScope.Associates = UnassignedAssociates;
        setTimeout(function() {
            $scope.DashboardScope.AssociateLastPage = getLastIndex("associate-pagination");
            if($scope.DashboardScope.AssociateLastPage < $scope.DashboardScope.AssociateCurrentPage) {
                $scope.DashboardScope.AssociateCurrentPage = $scope.DashboardScope.AssociateLastPage;
            }
        }, 20);

        var housingFilterBtn;
        var associateFilterBtn;
        var housingdash = document.getElementById("dashboard-housing");
        var title = document.getElementById("dashboard-associate").children[0].children[0];
        var assigned = document.getElementsByClassName("assigned");
        var unassigned = document.getElementsByClassName("unassigned");
        var assignBtns = document.getElementsByClassName("assignAssociates");
        var removeBtns = document.getElementsByClassName("removeAssociates");
        var filterBtns = document.getElementsByClassName("btn-filter");
        var removingCtrls = document.getElementsByClassName("removing-controls");
        $scope.DashboardScope.Filters.RadGender = "all";

        $scope.DashboardScope.ExpandView();
        $scope.DashboardScope.DisplayMode = 1;

        if(document.getElementById("associate-filters").style.height == "15em") {
            $scope.DashboardScope.ToggleFilters("associate");
        }

        document.getElementById("aGenderAll").disabled = false;
        document.getElementById("aGenderMale").disabled = false;
        document.getElementById("aGenderFemale").disabled = false;

        for(var i = 0; i < filterBtns.length; i++) {
            if(filterBtns[i].parentElement.parentElement == housingdash) {
                housingFilterBtn = filterBtns[i];
            } else {
                associateFilterBtn = filterBtns[i];
            }
        }

        for(var i = 0; i < removeBtns.length; i++) {
            assignBtns[i].style.display = "inline-block";
            removeBtns[i].style.display = "inline-block";
        }

        for(var i = 0; i < assigned.length; i++) {
            assigned[i].style.display = "none";
        }

        for(var i = 0; i < unassigned.length; i++) {
            unassigned[i].style.display = "inline-block";
        }

        housingFilterBtn.style.display = "inline-block";
        associateFilterBtn.style.display = "none";
        removingCtrls[0].style.display = "none";
        removingCtrls[1].style.display = "none";
        title.innerHTML = "Unassigned Associates";
    }

    $scope.DashboardScope.UpdateUnits = function() {
        if($scope.DashboardScope.Units.length > 0 && $scope.DashboardScope.Data.length > 0 && $scope.DashboardScope.Associates.length > 0 && $scope.DashboardScope.Batches.length > 0)
        {
            $scope.DashboardScope.Units.forEach(function(unit) {
                var currentCap = 0;
                var currentCars = 0;
                var techs = [];
                var batches = [];
                var emails = [];
                var occupants = [];

                $scope.DashboardScope.Data.forEach(function(data) {
                    if(data.HousingUnitName == unit.HousingUnitName)
                    {
                        emails.push(data.AssociateEmail);
                    }
                }, this);

                emails.forEach(function(email) {
                    AllAssociates.forEach(function(occupant) {
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
                    $scope.DashboardScope.Batches.forEach(function(batch) {
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
            }, this);
        }
    }

    $scope.DashboardScope.UpdateAssociates = function() {
        if($scope.DashboardScope.Batches.length > 0 && $scope.DashboardScope.Associates.length > 0){
            $scope.DashboardScope.Associates.forEach(function(associate) {
                $scope.DashboardScope.Batches.forEach(function(batch) {
                    if(associate.BatchName == batch.Name){
                        associate['Batch'] = batch;
                    }
                }, this);
            }, this);
        }
    }

    $scope.DashboardScope.ExpandView = function() {
        var sections = document.getElementsByTagName("section");
        var section1;
        var section2;
        
        for(var i = 0; i < sections.length; i++)
        {
            if(sections[i].id.includes("dashboard-left") || sections[i].id.includes("dashboard-right"))
            {
                if(sections[i].classList.contains("expanded"))
                {
                    section1 = sections[i];
                    $scope.DashboardScope.HousingPageSize = 3;
                    $scope.DashboardScope.AssociatePageSize = 9;
                }
                else
                {
                    section2 = sections[i];
                    $scope.DashboardScope.HousingPageSize = 1;
                    $scope.DashboardScope.AssociatePageSize = 24;
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
            hfilters.childNodes[1].style.width = "25.5em";
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
            afilters.childNodes[1].style.width = "25.5em";
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

    var assignAssociate = function(unit, modal) {
        var error1 = document.getElementById("error-1");
        var error2 = document.getElementById("error-2");
        $scope.DashboardScope.SelectedAssociates.forEach(function (associate) {
            if (unit.GenderName == associate.GenderName && unit.MaxCapacity != unit.Capacity) {
                var d1 = new Date();
                var d2 = new Date();

                if (d1.getMonth() + 3 > 11) {
                    var diff = (d2.getMonth() + 3) - 11;
                    d2.setMonth(diff - 1);
                    d2.setFullYear(d2.getFullYear() + 1);
                } else {
                    d2.setMonth(d2.getMonth() + 3);
                }

                var temp = {
                    AssociateEmail: associate.Email,
                    HousingUnitName: unit.HousingUnitName,
                    MoveInDate: getDateFormat(d1),
                    MoveOutDate: getDateFormat(d2),
                    HousingDataAltId: null
                };

                housingdata.add(temp, function(data) {
                    if (data.status == 200) {
                        $scope.DashboardScope.ResetForms(modal);
                        $scope.DashboardScope.UpdateAjax();
                    }
                });
            } else {
                if (unit.GenderName != associate.GenderName) {
                    error1.style.display = "block";
                }
                if (unit.MaxCapacity == unit.Capacity) {
                    error2.style.display = "block";
                }
            }
        }, this);
        
        $scope.DashboardScope.ResetSelection();
    }

    var removeAssociate = function(unit, modal) {
        $scope.DashboardScope.SelectedAssociates.forEach(function(associate) {
            $scope.DashboardScope.Data.forEach(function(data) {
                if(data.AssociateEmail == associate.Email && data.HousingUnitName == unit.HousingUnitName) {
                    housingdata.delete(data.HousingDataAltId, function(data){
                        if(data.status == 200) {
                            $scope.DashboardScope.ResetForms(modal);
                            $scope.DashboardScope.UpdateAjax();
                        }
                    });
                }
            }, this);
        }, this);
        
        $scope.DashboardScope.ResetSelection();
    }

    $scope.DashboardScope.ResetForms = function (modal) {
        var forms = document.getElementsByClassName("inputForms");
        var errors = document.getElementsByClassName("error-message");
        for(var i = 0; i < forms.length; i++) {
            forms[i].reset();
        }
        for(var i = 0; i < errors.length; i++) {
            errors[i].style.display = "none";
        }
        $(modal).modal('hide');
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

    var getLastIndex = function(id)
    {
        var pagin = document.getElementById(id);
        var pages = pagin.children[0].children[0].children;
        var count = pages.length - 2;

        return count;
    }

    setTimeout(function() {
        $scope.DashboardScope.AssociateLastPage = getLastIndex("associate-pagination");
        $scope.DashboardScope.AssociateLastPage = getLastIndex("housing-pagination");
    }, 20);
});