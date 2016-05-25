// Brand CONTROLLER
function dashboardController($scope, brandsService, shopsService, dealFactory) {
    brandsService.getBrands().then(function (res) {
        $scope.brands = res.data;
    });
    shopsService.getShops().then(function (res) {
        $scope.shops = res.data;
    });
    $scope.shopChanged = function(shop){
        dealFactory.deal.shop_id = shop._id;
    };
}