angular.module("HousingApp")
.filter('lettercap', function() {
    return function(x) {
        return x.charAt(0).toUpperCase() + x.slice(1);
    }
})
.filter('changedate', function() {
    return function(x) {
        var txt = x.slice(5,7) + "/" + x.slice(8,10) + "/" + x.slice(0,4);
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
.filter("pagecount", function () {
    return function (data, size) {
        if (angular.isArray(data)) {
            var result = [];
            for (var i = 0; i < Math.ceil(data.length / size); i++) {
                result.push(i);
            }
            return result;
        }
        else {
            return data;
        }
    }
})
.filter("pagerange", function () {
    return function (data, page, size) {
        var start = (page - 1) * size;
        if (data.length < start) {
            return [];
        }
        else {
            return data.slice(start, size + start);
        }
    }
})
.filter("search", function () {
    return function (data, input, mode) {
        if (input == "" || mode == undefined) {
            return data;
        }

        var result = [];

        data.forEach(function(element) {
            if(mode == 1 && (element.FirstName + " " + element.LastName).toLowerCase().includes(input.toLowerCase()))
            {
                result.push(element);
            }
            else if(mode == 2 && (element.Name).toLowerCase().includes(input.toLowerCase()))
            {
                result.push(element);
            }
            else if(mode == 3 && (element.HousingUnitName).toLowerCase().includes(input.toLowerCase()))
            {
                result.push(element);
            }
        }, this);

        return result;
    }
})
.filter('assigned', function(){
    return function (associates, mode, unit) {
        var result = [];
        var count = 0;

        if(mode == 1)
        {
            associates.forEach(function(associate) {
                if(!associate.HasKeys)
                {
                    result[count] = associate;
                    count++;
                }
            }, this);

            return result;
        }
        else if(mode == 2)
        {
            if(unit.AptNumber == undefined)
            {
                return associates;
            }
            
            unit.Occupants.forEach(function(associate) {
                result[count] = associate;
                count++;
            }, this);

            return result;
        }
        else
        {
            return associates;
        }
    }
})
.filter('array', function(){
    return function(array) {
        var str = "";

        if (array.length == 0)
        {
            str = "None";
        }

        return str;
    }
})
.filter('selected', function() {
    return function(units, current) {
        if(!current)
        {
            return units
        }
        
        var result = [];

        units.forEach(function(unit) {
            if(unit.HousingUnitName == current.HousingUnitName)
            {
                result[0] = unit;
                return result;
            }
        }, this);
        
        return units;
    }
})
.filter('afilters', function () {
    return function (associates, filters, selected) {
        if(associates == undefined) {
            return [];
        }

        if(!filters) {
            return associates;
        }

        var result = [];

        associates.forEach(function(associate) {
            var checks = 0;
            
            if (filters.ASrcChoice == "name" && (filters.ASrcString == "" || (associate.FirstName + " " + associate.LastName).toLowerCase().includes(filters.ASrcString.toLowerCase()))) {
                checks++;
            } else if (filters.ASrcChoice == "batch" && (filters.ASrcString == "" || associate.BatchName.toLowerCase().includes(filters.ASrcString.toLowerCase()))) {
                checks++;
            }

            if ((filters.RadTech == "all") || (filters.RadTech == associate.Batch.Technology.toLowerCase())) {
                checks++;
            }

            if ((filters.RadGender == "all") || (filters.RadGender == associate.GenderName.toLowerCase())) {
                checks++;
            }
            
            if ((filters.RadCar == "all") || (filters.RadCar == "yes" && associate.HasCar) || (filters.RadCar == "no" && !associate.HasCar)) {
                checks++;
            }

            if (checks == 4) {
                result.push(associate);
            }
        }, this);

        return result;
    }
})
.filter('hfilters', function () {
    return function (units, filters, mode) {
        if(units == undefined) {
            return [];
        }

        if(!filters || mode == 2) {
            return units;
        }

        var result = [];

        units.forEach(function(unit) {
            var checks = 0;
            var techs = unit.Tech;
            var batches = unit.Batch;
            var countTech = 0;
            var countBatch = 0;
            
            if (filters.HSrcChoice == "name" && (filters.HSrcString == "" || (unit.HousingUnitName.toLowerCase()).includes(filters.HSrcString.toLowerCase()))) {
                checks++;
            } else if (filters.HSrcChoice == "batch" && (filters.HSrcString == "" || inArray(batches, filters.HSrcString, 2))) {
                checks++;
            }

            if ((filters.RadTech == "all") || (inArray(techs, filters.RadTech, 1))) {
                checks++;
            }

            if ((filters.RadGender == "all") || (filters.RadGender == unit.GenderName.toLowerCase())) {
                checks++;
            }
            
            if ((filters.RadCar == "all") || (filters.RadCar == "yes" && unit.Cars < 2) || (filters.RadCar == "no" && unit.Cars >= 2)) {
                checks++;
            }

            if ((filters.Current == "") || (filters.Current == unit.HousingUnitName)) {
                checks++;
            }

            if (checks == 5) {
                result.push(unit);
            }
        }, this);

        return result;
    }
});

function isEmpty(obj) {
    for(var x in obj) {
        if (obj.hasOwnProperty(x)) {
            return false;
        }
    }

    return true;
}

function inArray(array, item, mode) {
    if(mode == 1) {
        for(var i = 0; i < array.length; i++) {
            if(array[i].toLowerCase() == item.toLowerCase()) {
                return true;
            }
        }
    } else if(mode == 2) {
        for(var i = 0; i < array.length; i++) {
            if(array[i].toLowerCase().includes(item.toLowerCase())) {
                return true;
            }
        }
    }
    
    return false;
}
