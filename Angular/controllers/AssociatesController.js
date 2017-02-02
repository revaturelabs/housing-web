angular.module("HousingApp")
.constant("associatesURL", "fakedata/Associates.json")
.filter('date', function() {
    return function(x) {
        var txt = x.slice(4,6) + "/" + x.slice(6,8) + "/" + x.slice(0,4);
        return txt;
    }
})
.filter('bool', function() {
    return function(x) {
        var txt = "";
        if (x) {
            txt = "Yes";
        }
        else {
            txt = "No";
        }
        return txt;
    }
})
.filter('hasKeys', function() {
    return function(x) {
        var result = [];
        var count = 0;
        
        x.forEach(function(element) {
            if(!element.HasKeys)
            {
                result[count] = element;
                count++;
            }
        }, this);
        return result;
    }
})
.controller("AssociatesCtrl", function($scope, $http, associatesURL) {
    var request = new XMLHttpRequest();
    $scope.associates = [];
    $scope.AssociateFilters = {
        srcChoice: "name",
        srcString: "",
        radTech: "all",
        radGender: "all",
        radCar: "all"
    };

    request.onreadystatechange = function () {
        if(request.readyState == 4 && request.status == 200) {
            $scope.associates = JSON.parse(request.responseText);
        }
    }

    request.open("GET", associatesURL, false);
    request.send();

    $scope.toggleFilters = function() {
        var filters = document.getElementById("associate-filters");
        var list = document.getElementById("associate-list");

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
.filter('afilters', function(){
    return function(associates, AssociateFilters) {
        if(!AssociateFilters)
        {
            return associates;
        }

        var result = [];
        var count = 0;

        associates.forEach(function(associate) {
            var checks = 0;
            
            if (AssociateFilters.srcChoice == "name" && (AssociateFilters.srcString == "" || (associate.FirstName + " " + associate.LastName).toLowerCase().includes(AssociateFilters.srcString.toLowerCase())))
            {
                checks++;
            }
            else if (AssociateFilters.srcChoice == "batch" && (AssociateFilters.srcString == "" || associate.Batch.Name.toLowerCase().includes(AssociateFilters.srcString.toLowerCase())))
            {
                checks++;
            }

            if ((AssociateFilters.radTech == "all") || (AssociateFilters.radTech == associate.Batch.Technology.toLowerCase()))
            {
                checks++;
            }

            if ((AssociateFilters.radGender == "all") || (AssociateFilters.radGender == associate.Gender.toLowerCase()))
            {
                checks++;
            }
            
            if ((AssociateFilters.radCar == "all") || (AssociateFilters.radCar == "yes" && associate.HasCar) || (AssociateFilters.radCar == "no" && !associate.HasCar))
            {
                checks++;
            }

            if (checks == 4)
            {
                result[count] = associate;
                count++;
            }
        }, this);

        return result;
    }
});