angular.module("HousingApp")
.controller("DashboardCtrl", function($scope, $http, $state, $stateParams, associatesURL, complexURL, dataURL, unitURL) {
    var requestAssociate = new XMLHttpRequest();
    var requestComplex = new XMLHttpRequest();
    var requestData = new XMLHttpRequest();
    var requestUnit = new XMLHttpRequest();

    $scope.DashboardScope = [];
    $scope.DashboardScope.AssociatePageSize = 9;
    $scope.DashboardScope.HousingPageSize = 3;
    $scope.DashboardScope.AssociateCurrentPage = 1;
    $scope.DashboardScope.HousingCurrentPage = 1;
    $scope.DashboardScope.AssociateLastPage = 1;
    $scope.DashboardScope.HousingLastPage = 1;
    $scope.DashboardScope.DisplayMode = 1;
    $scope.DashboardScope.CurrentAssociate = {};
    $scope.DashboardScope.CurrentHousing = {};
    $scope.DashboardScope.CurrentUnit = {};
    $scope.DashboardScope.Associates = [];
    $scope.DashboardScope.Complexes = [];
    $scope.DashboardScope.Data = [];
    $scope.DashboardScope.Units = [];
    $scope.DashboardScope.SelectedAssociates = [];
    $scope.DashboardScope.Filters = {
        SrcChoice: "name",
        SrcString: "",
        RadTech: "all",
        RadGender: "all",
        RadCar: "all",
        Current: ""
    };

    requestAssociate.onreadystatechange = function () {
        if(requestAssociate.readyState == 4 && requestAssociate.status == 200) {
            $scope.DashboardScope.Associates = JSON.parse(requestAssociate.responseText);
        }
    }

    requestComplex.onreadystatechange = function () {
        if(requestComplex.readyState == 4 && requestComplex.status == 200) {
            $scope.DashboardScope.Complexes = JSON.parse(requestComplex.responseText);
        }
    }

    requestData.onreadystatechange = function () {
        if(requestData.readyState == 4 && requestData.status == 200) {
            $scope.DashboardScope.Data = JSON.parse(requestData.responseText);
        }
    }

    requestUnit.onreadystatechange = function () {
        if(requestUnit.readyState == 4 && requestUnit.status == 200) {
            $scope.DashboardScope.Units = JSON.parse(requestUnit.responseText);
        }
    }

    requestAssociate.open("GET", associatesURL, false);
    requestComplex.open("GET", complexURL, false);
    requestData.open("GET", dataURL, false);
    requestUnit.open("GET", unitURL, false);

    requestAssociate.send();
    requestComplex.send();
    requestData.send();
    requestUnit.send();

    $scope.DashboardScope.UpdatePageList = function (size, mode)
    {
        if(mode == 1)
        {
            $scope.DashboardScope.AssociatePageSize = size;
            $scope.DashboardScope.AssociateCurrentPage = 1;
            setTimeout(function() {
                $scope.DashboardScope.AssociateLastPage = getLastIndex();
            }, 20);
        }
        else if(mode == 2)
        {
            $scope.DashboardScope.HousingPageSize = size;
            $scope.DashboardScope.HousingCurrentPage = 1;
            setTimeout(function() {
                $scope.DashboardScope.HousingLastPage = getLastIndex();
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
                updateSpacing(10, 0);
            }
            else if(filters.style.height == "0em")
            {
                filters.style.height = "15em";
                updateSpacing(10, 210);
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

    $scope.DashboardScope.GetCurrentAssociate = function (person) {
        $scope.DashboardScope.CurrentAssociate = person;
    }

    $scope.DashboardScope.GetCurrentComplex = function (complex) {
        $scope.DashboardScope.CurrentHousing = complex;
    }

    $scope.DashboardScope.GetCurrentUnit = function (unit) {
        $scope.DashboardScope.CurrentUnit = unit;
    }

    $scope.DashboardScope.StartAssigning = function (unit) {
        $scope.DashboardScope.Filters.Current = unit.AptNumber + " " + unit.Complex.Name;
        var filterBtn;
        var dashboard = document.getElementById("dashboard-housing");
        var assignBtns = document.getElementsByClassName("assignAssociates");
        var removeBtns = document.getElementsByClassName("removeAssociates");
        var occupants = document.getElementsByClassName("housing-occupants");
        var filterBtns = document.getElementsByClassName("btn-filter");
        var assigningCtrls = document.getElementsByClassName("assigning-controls");

        $scope.DashboardScope.ExpandView();

        for(var i = 0; i < filterBtns.length; i++)
        {
            if(filterBtns[i].parentElement.parentElement == dashboard)
            {
                filterBtn = filterBtns[i];
            }
        }

        for(var i = 0; i < assignBtns.length; i++)
        {
            assignBtns[i].style.display = "none";
            removeBtns[i].style.display = "none";
        }

        for(var i = 0; i < occupants.length; i++)
        {
            occupants[i].classList.add("current");
        }

        filterBtn.style.display = "none";
        assigningCtrls[0].style.display = "inline-block";
        assigningCtrls[1].style.display = "inline-block";
    }

    $scope.DashboardScope.StopAssigning = function () {
        $scope.DashboardScope.Filters.Current = "";
        var filterBtn;
        var dashboard = document.getElementById("dashboard-housing");
        var assignBtns = document.getElementsByClassName("assignAssociates");
        var removeBtns = document.getElementsByClassName("removeAssociates");
        var occupants = document.getElementsByClassName("housing-occupants");
        var filterBtns = document.getElementsByClassName("btn-filter");
        var assigningCtrls = document.getElementsByClassName("assigning-controls");
        
        $scope.DashboardScope.ExpandView();
        $scope.DashboardScope.ResetSelection();

        for(var i = 0; i < filterBtns.length; i++)
        {
            if(filterBtns[i].parentElement.parentElement == dashboard)
            {
                filterBtn = filterBtns[i];
            }
        }

        for(var i = 0; i < assignBtns.length; i++)
        {
            assignBtns[i].style.display = "inline-block";
            removeBtns[i].style.display = "inline-block";
        }

        for(var i = 0; i < occupants.length; i++)
        {
            occupants[i].classList.remove("current");
        }

        filterBtn.style.display = "inline-block";
        assigningCtrls[0].style.display = "none";
        assigningCtrls[1].style.display = "none";
    }

    $scope.DashboardScope.StartRemoving = function (unit) {
        $scope.DashboardScope.CurrentUnit = unit;
        $scope.DashboardScope.Filters.Current = unit.AptNumber + " " + unit.Complex.Name;
        var filterBtn;
        var dashboard = document.getElementById("dashboard-housing");
        var title = document.getElementById("dashboard-associate").children[0].children[0];
        var assigned = document.getElementsByClassName("assigned");
        var unassigned = document.getElementsByClassName("unassigned");
        var assignBtns = document.getElementsByClassName("assignAssociates");
        var removeBtns = document.getElementsByClassName("removeAssociates");
        var filterBtns = document.getElementsByClassName("btn-filter");
        var removingCtrls = document.getElementsByClassName("removing-controls");

        $scope.DashboardScope.ExpandView();
        $scope.DashboardScope.DisplayMode = 2;

        for(var i = 0; i < filterBtns.length; i++)
        {
            if(filterBtns[i].parentElement.parentElement == dashboard)
            {
                filterBtn = filterBtns[i];
            }
        }

        for(var i = 0; i < removeBtns.length; i++)
        {
            assignBtns[i].style.display = "none";
            removeBtns[i].style.display = "none";
        }

        setTimeout(function() {
            for(var i = 0; i < assigned.length; i++)
            {
                assigned[i].style.display = "inline-block";
            }
        }, 2);

        for(var i = 0; i < unassigned.length; i++)
        {
            unassigned[i].style.display = "none";
        }
        
        filterBtn.style.display = "none";
        removingCtrls[0].style.display = "inline-block";
        removingCtrls[1].style.display = "inline-block";
        title.innerHTML = "Assigned Associates";
    }

    $scope.DashboardScope.StopRemoving = function () {
        $scope.DashboardScope.CurrentUnit = {};
        $scope.DashboardScope.Filters.Current = "";

        var filterBtn;
        var dashboard = document.getElementById("dashboard-housing");
        var title = document.getElementById("dashboard-associate").children[0].children[0];
        var assigned = document.getElementsByClassName("assigned");
        var unassigned = document.getElementsByClassName("unassigned");
        var assignBtns = document.getElementsByClassName("assignAssociates");
        var removeBtns = document.getElementsByClassName("removeAssociates");
        var filterBtns = document.getElementsByClassName("btn-filter");
        var removingCtrls = document.getElementsByClassName("removing-controls");

        $scope.DashboardScope.ExpandView();
        $scope.DashboardScope.ResetSelection();
        $scope.DashboardScope.DisplayMode = 1;

        for(var i = 0; i < filterBtns.length; i++)
        {
            if(filterBtns[i].parentElement.parentElement == dashboard)
            {
                filterBtn = filterBtns[i];
            }
        }

        for(var i = 0; i < removeBtns.length; i++)
        {
            assignBtns[i].style.display = "inline-block";
            removeBtns[i].style.display = "inline-block";
        }

        for(var i = 0; i < assigned.length; i++)
        {
            assigned[i].style.display = "none";
        }

        for(var i = 0; i < unassigned.length; i++)
        {
            unassigned[i].style.display = "inline-block";
        }

        filterBtn.style.display = "inline-block";
        removingCtrls[0].style.display = "none";
        removingCtrls[1].style.display = "none";
        title.innerHTML = "Unassigned Associates";
    }

    var count = 0;

    $scope.DashboardScope.Units.forEach(function(unit) {
        var currentCap = 0;
        var currentCars = 0;
        var occupants = [];

        $scope.DashboardScope.Data.forEach(function(data) {
            if(data.HousingUnit.AptNumber == unit.AptNumber && data.HousingUnit.Complex.Name == unit.Complex.Name)
            {
                currentCap++;
                
                if(data.Associate.HasCar)
                {
                    currentCars++;
                }
                    occupants.push(data.Associate);
            }
        }, this);

        unit['Capacity'] = currentCap;
        unit['Cars'] = currentCars;
        unit['Occupants'] = occupants;
    }, this);

    var updateSpacing = function (time, height, id) {
        setTimeout(function() {
            var content = document.getElementById(id + "-content");
            var contentParent = content.parentElement;
            var spacing = contentParent.clientHeight;

            for (var i = 0; i < contentParent.children.length; i++)
            {
                if (contentParent.children[i] != content)
                {
                    if (contentParent.children[i].id != id + "-filters")
                    {
                        spacing -= contentParent.children[i].clientHeight;
                    }
                    else if (contentParent.children[i].id == id + "-filters" && height != 0) 
                    {
                        spacing -= height;
                    }
                }
            }
            
            content.style.height = spacing + "px";
        }, time);
    }

    var getLastIndex = function(id)
    {
        var pagin = document.getElementById(id);
        var pages = pagin.children[0].children[0].children;
        var count = pages.length - 2;

        return count;
    }

    updateSpacing(10, 0, "associate");
    updateSpacing(10, 0, "housing");

    setTimeout(function() {
        $scope.DashboardScope.AssociateLastPage = getLastIndex("associate-pagination");
        $scope.DashboardScope.AssociateLastPage = getLastIndex("housing-pagination");
    }, 20);

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

        console.log(divcolumns[i]);

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
});