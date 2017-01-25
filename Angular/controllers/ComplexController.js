var app = module.angular('HousingApp', []);

app.controller ('ComplexCtrl',function($scope,$http){

    $scope.compList = [];
    $scope.compName;
    $scope.compAddress;
    $scope.compNumber;
    $scope.IsHotel;
   

    $http({
        method:'GET',
        url: '/workforce-housing-rest/api/housingcomplex'
    })
    .then(function(response){
        $scope.compList = response.data;
    })


    $scope.addComp = function(){

        $http({
            method: "POST",
            url: '/workforce-housing-rest/api/housingcomplex',
            data:{
                Name: $scope.compName,
                Address: $scope.compAddress,
                PhoneNumber: $scope.compNumber

            }

        })

    }


    $scope.deleteComp = function(){

        $http({
            method:'DELETE',
            url: '/workforce-housing-rest/api/housingcomplex',
            data: $scope.delComp,
            headers:{
                'Content Type': 'application/json'
            }


        })


    }
  



});
