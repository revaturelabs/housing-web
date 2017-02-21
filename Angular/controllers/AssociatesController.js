angular.module("HousingApp")
.controller("AssociatesCtrl", function($scope, $http, associate, batch) {

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
    
    $scope.AssociateScope.UpdateAjax = function() {
        associate.getAll(function(data){
            $scope.AssociateScope.Associates = data;
            setTimeout(function() {
                $scope.AssociateScope.LastPage = getLastIndex();
                if($scope.AssociateScope.LastPage < $scope.AssociateScope.CurrentPage)
                {
                    $scope.AssociateScope.CurrentPage = $scope.AssociateScope.LastPage;
                }
            }, 20);
        });

        batch.getAll(function(data){
            $scope.AssociateScope.Batches = data;
            $scope.AssociateScope.NewAssociate.BatchName = $scope.AssociateScope.Batches[0].Name;
        });
    }

    $scope.AssociateScope.UpdateAjax();

    $scope.AssociateScope.UpdatePageList = function (size)
    {
        $scope.AssociateScope.PageSize = size;
        $scope.AssociateScope.CurrentPage = 1;
        setTimeout(function() {
            $scope.AssociateScope.LastPage = getLastIndex();
        }, 20);
    }

    $scope.AssociateScope.GoToPage = function (page) {
        if(page >= 1 && page <= $scope.AssociateScope.LastPage)
        {
            $scope.AssociateScope.CurrentPage = page;
        }
    }

    $scope.AssociateScope.GetPageClass = function (page) {
        return $scope.AssociateScope.CurrentPage == page ? "btn-revature" : "";
    }

    $scope.AssociateScope.GetCurrentAssociate = function (associate) {
        $scope.AssociateScope.CurrentAssociate = associate;
    }

    $scope.AssociateScope.EditAssociate = function (associate) {
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

    $scope.AssociateScope.AddAssociate = function () {
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
        associate.add(person, function(data){
            if(data.status == 200)
            {
                $scope.AssociateScope.UpdateAjax();
            }
        });
    }

    $scope.AssociateScope.ModAssociate = function () {
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
        associate.update(person.Email, person, function(data){
            if(data.status == 200)
            {
                $scope.AssociateScope.UpdateAjax();
            }
        });
    }

    $scope.AssociateScope.RemoveAssociate = function (person) {
        associate.delete(person, function(data){
            if(data.status == 200)
            {
                $scope.AssociateScope.UpdateAjax();
            }
        });
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

    var updateSpacing = function (time, height) {
        setTimeout(function() {
            var content = document.getElementById("associate-content");
            var contentParent = content.parentElement;
            var spacing = contentParent.clientHeight;

            for (var i = 0; i < contentParent.children.length; i++)
            {
                if (contentParent.children[i] != content)
                {
                    if (contentParent.children[i].id != "associate-filters")
                    {
                        spacing -= contentParent.children[i].clientHeight;
                    }
                    else if (contentParent.children[i].id == "associate-filters" && height != 0) 
                    {
                        spacing -= height;
                    }
                }
            }
            
            content.style.height = spacing + "px";
        }, time);
    }

    var getLastIndex = function()
    {
        var pagin = document.getElementById("associate-pagination");
        var pages = pagin.children[0].children[0].children;
        var count = pages.length - 2;

        return count;
    }

    updateSpacing(10, 0);

    setTimeout(function() {
        $scope.AssociateScope.LastPage = getLastIndex();
    }, 20);
});