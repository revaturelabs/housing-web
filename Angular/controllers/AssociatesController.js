var app = module.angular('HousingApp', []);

app.controller('AssociatesCtrl', function($scope,$http){

    $scope.associateList =[];

    $http({
        method:'GET',
        url='',
    })
    .then(function(response){
        $scope.associateList = response.data;
    })

});