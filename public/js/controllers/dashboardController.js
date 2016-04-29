// Brand CONTROLLER
function dashboardController($scope, brandsService, shopsService) {
    brandsService.getBrands().then(function (res) {
        $scope.brands = res.data;
    });
    shopsService.getShops().then(function (res) {
        $scope.shops = res.data;
    });
    selectedBrand = $scope.selectedBrand;
    var brand = null;
    $scope.brandChanged = function(brand){
        /*$scope.datas.brand = brand;*/
        console.log(brand._id);
    }
}