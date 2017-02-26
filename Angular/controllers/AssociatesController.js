/*
This controller handles the independent Associate page.
*/
angular.module("HousingApp")
.controller("AssociatesCtrl", function($scope, $http, associate, batch) {
    // Scope variables
    $scope.AssociateScope = [];
    $scope.AssociateScope.PageSize = 3;
    $scope.AssociateScope.CurrentPage = 1;
    $scope.AssociateScope.LastPage = 1;
    $scope.AssociateScope.CurrentAssociate = [];
    $scope.AssociateScope.Associates = [];
    $scope.AssociateScope.Batches = [];
    $scope.AssociateScope.NewAssociate = {
        FirstName: "",
        LastName: "",
        Gender: "",
        BatchName: null,
        PhoneNumber: "",
        Email: "",
        DateOfBirth: "",
        HasCar: "",
        HasKeys: "",
        NeedsHousing: ""
    };
    $scope.AssociateScope.UpdateAssociate = {
        FirstName: "",
        LastName: "",
        Gender: "",
        BatchName: null,
        PhoneNumber: "",
        Email: "",
        DateOfBirth: "",
        HasCar: "",
        HasKeys: "",
        NeedsHousing: ""
    };
    $scope.AssociateScope.Search = {
        Associate: ""
    };
    
    // Function for updating all arrays with current information from the AJAX services.
    $scope.AssociateScope.UpdateAjax = function() {
        associate.getAll(function(data) {
            $scope.AssociateScope.Associates = data;
            setTimeout(function() {
                $scope.AssociateScope.LastPage = getLastIndex();
                if ($scope.AssociateScope.LastPage < $scope.AssociateScope.CurrentPage) {
                    $scope.AssociateScope.CurrentPage = $scope.AssociateScope.LastPage;
                }
            }, 200);
        });

        batch.getAll(function(data) {
            $scope.AssociateScope.Batches = data;
            $scope.AssociateScope.NewAssociate.BatchName = $scope.AssociateScope.Batches[0].Name;
        });
    }

    // Initialize all data from the database.
    $scope.AssociateScope.UpdateAjax();

    // Changes page to the selected page in pagination.
    $scope.AssociateScope.GoToPage = function(page) {
        if (page >= 1 && page <= $scope.AssociateScope.LastPage) {
            $scope.AssociateScope.CurrentPage = page;
        }
    }

    // Sets the active page to a different class.
    $scope.AssociateScope.GetPageClass = function(page) {
        return $scope.AssociateScope.CurrentPage == page ? "btn-revature" : "";
    }

    // Gets current associate.
    $scope.AssociateScope.GetCurrentAssociate = function(associate) {
        $scope.AssociateScope.CurrentAssociate = associate;
    }

    // Sets the selected associate to the update variable, is called on click.
    $scope.AssociateScope.EditAssociate = function(associate) {
        $scope.AssociateScope.UpdateAssociate = {
            FirstName: associate.FirstName,
            LastName: associate.LastName,
            Gender: associate.GenderName,
            BatchName: associate.BatchName,
            PhoneNumber: associate.PhoneNumber,
            Email: associate.Email,
            DateOfBirth: reverseDateFormat(associate.DateOfBirth),
            HasCar: associate.HasCar == true ? "yes" : "no",
            HasKeys: associate.HasKeys == true ? "yes" : "no",
            NeedsHousing: associate.NeedsHousing == true ? "yes" : "no"
        };
    }

    // Creates an associate object then sends it to the database.
    $scope.AssociateScope.AddAssociate = function(modal) {
        var temp = $scope.AssociateScope.NewAssociate;
        var person = {
            FirstName: temp.FirstName,
            LastName: temp.LastName,
            GenderName: temp.Gender,
            BatchName: temp.BatchName,
            PhoneNumber: temp.PhoneNumber,
            Email: temp.Email,
            DateOfBirth: getDateFormat(temp.DateOfBirth),
            HasCar: temp.HasCar == "yes" ? true : false,
            HasKeys: temp.HasKeys == "yes" ? true : false,
            NeedsHousing: temp.NeedsHousing == "yes" ? true : false
        };
        associate.add(person, function(data) {
            if (data.status == 200) {
                $scope.AssociateScope.ResetForms(modal, 1);
                $scope.AssociateScope.UpdateAjax();
            }
        });
    }

    // Using the update variable, send the updated associate to the database.
    $scope.AssociateScope.ModAssociate = function() {
        var temp = $scope.AssociateScope.UpdateAssociate;
        var person = {
            FirstName: temp.FirstName,
            LastName: temp.LastName,
            GenderName: temp.Gender,
            BatchName: temp.BatchName,
            PhoneNumber: temp.PhoneNumber,
            Email: temp.Email,
            DateOfBirth: getDateFormat(temp.DateOfBirth),
            HasCar: temp.HasCar == "yes" ? true : false,
            HasKeys: temp.HasKeys == "yes" ? true : false,
            NeedsHousing: temp.NeedsHousing == "yes" ? true : false
        };
        associate.update(person.Email, person, function(data) {
            if (data.status == 200) {
                $scope.AssociateScope.ResetForms(modal, 2);
                $scope.AssociateScope.UpdateAjax();
            }
        });
    }

    // Removes the selected associate from the database.
    $scope.AssociateScope.RemoveAssociate = function(person) {
        associate.delete(person, function(data) {
            if (data.status == 200) {
                $scope.AssociateScope.ResetForms(modal, 1);
                $scope.AssociateScope.UpdateAjax();
            }
        });
    }

    // Resets all the form fields, errors, and hides the current modal.
    $scope.AssociateScope.ResetForms = function(modal, mode) {
        var forms = document.getElementsByClassName("inputForms");
        var errors = document.getElementsByClassName("error-message");
        if (mode == 1) {
            for (var i = 0; i < forms.length; i++) {
                forms[i].reset();
            }
        }
        for (var i = 0; i < errors.length; i++) {
            errors[i].style.display = "none";
        }
        $(modal).modal('hide');
    }

    // Changes the date format for sending to the database.
    var getDateFormat = function(d) {
        var dd = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
        var mm = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
        var yyyy = d.getFullYear();

        return yyyy + "-" + mm + "-" + dd + "T00:00:00";
    }

    // Changes the date format for editting.
    var reverseDateFormat = function(d) {
        var date = new Date(1, 1, 1, 0, 0, 0, 0);
        date.setDate(d.slice(8,10));
        date.setMonth(d.slice(5,7)-1);
        date.setFullYear(d.slice(0,4));
        
        return date;
    }

    // Gets the last index of the pagination.
    var getLastIndex = function() {
        var pagin = document.getElementById("associate-pagination");
        var pages = pagin.children[0].children[0].children;
        var count = pages.length - 2;

        return count;
    }
});