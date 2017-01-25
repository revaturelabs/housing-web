var app = module.angular('HousingApp', []);

app.controller ('ComplexCtrl',function($scope,$http){

    $scope.compList = [];
   

    $http({
        method:'GET',
        url: '/workforce-housing-rest/api/housingcomplex'
    })
    .then(function(response){
        $scope.compList = response.data;
    })

  



});
