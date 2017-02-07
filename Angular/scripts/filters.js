angular.module("HousingApp")
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
})
.filter('afilters', function(){
    return function(associates, filters) {
        if(!filters)
        {
            return associates;
        }

        var result = [];
        var count = 0;

        associates.forEach(function(associate) {
            var checks = 0;
            
            if (filters.SrcChoice == "name" && (filters.SrcString == "" || (associate.FirstName + " " + associate.LastName).toLowerCase().includes(filters.SrcString.toLowerCase())))
            {
                checks++;
            }
            else if (filters.SrcChoice == "batch" && (filters.SrcString == "" || associate.Batch.Name.toLowerCase().includes(filters.SrcString.toLowerCase())))
            {
                checks++;
            }

            if ((filters.RadTech == "all") || (filters.RadTech == associate.Batch.Technology.toLowerCase()))
            {
                checks++;
            }

            if ((filters.RadGender == "all") || (filters.RadGender == associate.Gender.toLowerCase()))
            {
                checks++;
            }
            
            if ((filters.RadCar == "all") || (filters.RadCar == "yes" && associate.HasCar) || (filters.RadCar == "no" && !associate.HasCar))
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
})
.filter('hfilters', function(){
    return function(units, filters, data) {
        if(!filters || !data)
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
            
            if (filters.SrcChoice == "name" && (filters.SrcString == "" || (unit.AptNumber + " " + unit.Complex.Name.toLowerCase()).includes(filters.SrcString.toLowerCase())))
            {
                checks++;
            }
            else if (filters.SrcChoice == "batch" && (filters.SrcString == "" || inArray(batches, filters.SrcString, 2)))
            {
                checks++;
            }

            if ((filters.RadTech == "all") || (inArray(techs, filters.RadTech, 2)))
            {
                checks++;
            }

            if ((filters.RadGender == "all") || (filters.RadGender == unit.Gender.toLowerCase()))
            {
                checks++;
            }
            
            if ((filters.RadCar == "all") || (filters.RadCar == "yes" && unit.Cars < 2) || (filters.RadCar == "no" && unit.Cars >= 2))
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
});
