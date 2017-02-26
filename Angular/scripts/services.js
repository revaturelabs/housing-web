/*
This file creates all the endpoints that pull and push data between the front-end and the logic layer.
*/
angular.module('HousingApp')
.service('associate', function ($http, AssociateURL) {
    var url = AssociateURL;

    this.getAll = function (callback) {
        url = AssociateURL;
        $http.get(url, {responseType:"json"})
        .then(function (response) {
            callback(response.data);
        }, function (error) {
            callback(error);
        });
    }

    this.get = function (id, callback) {
        url = AssociateURL + id + "/";
        $http.get(url, {responseType:"json"})
        .then(function (response) {
            callback(response.data);
        }, function (error) {
            callback(error);
        });
    }

    this.getUnassigned = function (callback)  {
        url = AssociateURL + "get-unassigned/";
        $http.get(url, {responseType:"json"})
        .then(function (response) {
            callback(response.data);
        }, function (error) {
            callback(error);
        });
    }

    this.add = function (person, callback) {
        url = AssociateURL;
        $http.post(url, JSON.stringify(person))
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }

    this.update = function (id, person, callback) {
        url = AssociateURL + id + "/";
        $http.put(url, JSON.stringify(person))
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }

    this.delete = function (id, callback) {
        url = AssociateURL + id + "/";
        $http.delete(url)
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }
}).service('batch', function ($http, BatchURL) {
    var url = BatchURL;

    this.getAll = function (callback) {
        url = BatchURL;
        $http.get(url, {responseType:"json"})
        .then(function (response) {
            callback(response.data);
        }, function (error) {
            callback(error);
        });
    }

    this.get = function (id, callback) {
        url = BatchURL + id + "/";
        $http.get(url, {responseType:"json"})
        .then(function (response) {
            callback(response.data);
        }, function (error) {
            callback(error);
        });
    }

    this.add = function (batch, callback) {
        url = BatchURL;
        $http.post(url, JSON.stringify(batch))
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }

    this.update = function (id, batch, callback) {
        url = BatchURL + id + "/";
        $http.put(url, JSON.stringify(batch))
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }

    this.delete = function (id, callback) {
        url = BatchURL + id + "/";
        $http.delete(url)
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }
}).service('housingcomplex', function ($http, HousingComplexURL) {
    var url = HousingComplexURL;

    this.getAll = function (callback) {
        url = HousingComplexURL;
        $http.get(url, {responseType:"json"})
        .then(function (response) {
            callback(response.data);
        }, function (error) {
            callback(error);
        });
    }

    this.get = function (id, callback) {
        url = HousingComplexURL + id + "/";
        $http.get(url, {responseType:"json"})
        .then(function (response) {
            callback(response.data);
        }, function (error) {
            callback(error);
        });
    }

    this.add = function (complex, callback) {
        url = HousingComplexURL;
        $http.post(url, JSON.stringify(complex))
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }

    this.update = function (id, complex, callback) {
        url = HousingComplexURL + id + "/";
        $http.put(url, JSON.stringify(complex))
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }

    this.delete = function (id, callback) {
        url = HousingComplexURL + id + "/";
        $http.delete(url)
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }
}).service('housingdata', function ($http, HousingDataURL) {
    var url = HousingDataURL;

    this.getAll = function (callback) {
        url = HousingDataURL;
        $http.get(url, {responseType:"json"})
        .then(function (response) {
            callback(response.data);
        }, function (error) {
            callback(error);
        });
    }

    this.get = function (id, callback) {
        url = HousingDataURL + id + "/";
        $http.get(url, {responseType:"json"})
        .then(function (response) {
            callback(response.data);
        }, function (error) {
            callback(error);
        });
    }

    this.getByDate = function (dataObj, callback) {
        url = HousingDataURL + "get-housing-data-by-date/";
        $http.post(url, JSON.stringify(dataObj))
        .then(function (response) {
            callback(response.data);
        }, function (error) {
            callback(error);
        });
    }

    this.add = function (dataObj, callback) {
        url = HousingDataURL;
        $http.post(url, JSON.stringify(dataObj))
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }

    this.update = function (id, dataObj, callback) {
        url = HousingDataURL + id + "/";
        $http.put(url, JSON.stringify(dataObj))
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }

    this.delete = function (id, callback) {
        url = HousingDataURL + id + "/";
        $http.delete(url)
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }
}).service('housingunit', function ($http, HousingUnitURL) {
    var url = HousingUnitURL;

    this.getAll = function (callback) {
        url = HousingUnitURL;
        $http.get(url, {responseType:"json"})
        .then(function (response) {
            callback(response.data);
        }, function (error) {
            callback(error);
        });
    }

    this.get = function (id, callback) {
        url = HousingUnitURL + id + "/";
        $http.get(url, {responseType:"json"})
        .then(function (response) {
            callback(response.data);
        }, function (error) {
            callback(error);
        });
    }

    this.getAvailable = function (callback) {
        url = HousingUnitURL + "available/";
        $http.get(url, {responseType:"json"})
        .then(function (response) {
            callback(response.data);
        }, function (error) {
            callback(error);
        });
    }

    this.add = function (unit, callback) {
        url = HousingUnitURL;
        $http.post(url, JSON.stringify(unit))
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }

    this.update = function (id, unit, callback) {
        url = HousingUnitURL + id + "/";
        $http.put(url, JSON.stringify(unit))
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }

    this.delete = function (id, callback) {
        url = HousingUnitURL + id + "/";
        $http.delete(url)
        .then(function (response) {
            callback(response);
        }, function (error) {
            callback(error);
        });
    }
});