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
.filter("pageCount", function () {
    return function (data, pageSize) {
        if (angular.isArray(data)) {
            var result = [];
            for (var i = 0; i < Math.ceil(data.length / pageSize); i++) {
                result.push(i);
            }
            return result;
        }
        else {
            return data;
        }
    }
})
.filter("range", function () {
    return function (data, page, size) {
        var start_index = (page - 1) * size;
        if (data.length < start_index) {
            return [];
        }
        else {
            return data.slice(start_index, size + start_index);
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
});
