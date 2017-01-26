var app = module.angular('HousingApp',[]);

app.controller('huCtrl', function($scope,$http){
   
 $scope.aptList = [];
 $scope.unitNum;
 $scope.maxCap;
 $scope.delUnit;
 $scope.GenderID;


    $http({
        method:"GET",
        url:'/workforce-housing-rest/api/filteraptsbycomplex/'
    })
    .then(function(response){
        $scope.aptList=response.data;
    })


      $scope.newUnit = function(){
        $http({
            method: 'POST',
            url: '/workforce-housing-rest/api/apartment/',
            data:{
                AptNumber: $scope.unitNum,
                MaxCapacity:$scope.maxCap,
                GenderId: $scope.GenderID

            }

        })
    }

    $scope.deleteUnit = function (){
        $http({
            method:"DELETE",
            url:'/workforce-housing-rest/api/apartment/',
            data:$scope.delUnit,
            headers:{
                'Content Type': 'application/json'
            }
        })
    }

});