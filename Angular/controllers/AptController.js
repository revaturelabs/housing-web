var app = module.angular('HousingApp',[]);

app.controller('AptCtrl', function($scope,$http){
   
 $scope.aptList = [];
 $scope.roomNum;
 $scope.maxCap;
 $scope.delApt;
 $scope.GenderId;


    $http({
        method:"GET",
        url:'/workforce-housing-rest/api/filteraptsbycomplex/'
    })
    .then(function(response){
        $scope.aptList=response.data;
    })


      $scope.newApt = function(){
        $http({
            method: 'POST',
            url: '/workforce-housing-rest/api/apartment/',
            data:{
                AptNumber: $scope.roomNum,
                MaxCapacity:$scope.maxCap,
                GenderId: $scope.GenderId

            }

        })
    }

    $scope.deleteApt = function (){
        $http({
            method:"DELETE",
            url:'/workforce-housing-rest/api/apartment/',
            data:$scope.delApt,
            headers:{
                'Content Type': 'application/json'
            }
        })
    }

});